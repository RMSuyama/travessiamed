/**
 * Ingestão diária das notícias oficiais da UCP (central.edu.py).
 * Guarda original em espanhol + resumo em PT-BR. Não republica o artigo inteiro no site.
 *
 *   npm run ucp:noticias          raspa e grava
 *   npm run ucp:noticias:export   CSV em data/ucp-noticias.csv
 */
import { createClient } from '@supabase/supabase-js';
import { createHash, randomBytes } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DATA_DIR = join(ROOT, 'data');
const STORE = join(DATA_DIR, 'ucp-noticias.json');
const CSV = join(DATA_DIR, 'ucp-noticias.csv');
const STAMP = join(DATA_DIR, 'ucp-noticias.last-run');
const ENV_PATH = join(ROOT, '.env');
const LISTING = 'https://central.edu.py/noticias';
const ORIGIN = 'https://central.edu.py';

function loadEnv() {
  if (!existsSync(ENV_PATH)) return;
  for (const line of readFileSync(ENV_PATH, 'utf8').split(/\r?\n/)) {
    const trim = line.trim();
    if (!trim || trim.startsWith('#')) continue;
    const eq = trim.indexOf('=');
    if (eq < 1) continue;
    const key = trim.slice(0, eq).trim();
    let value = trim.slice(eq + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnv();

function decodeAttr(value = '') {
  return value
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
    .trim();
}

function stripTags(html = '') {
  return decodeAttr(
    html
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/p>/gi, '\n\n')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+\n/g, '\n')
      .replace(/[ \t]{2,}/g, ' ')
      .trim()
  );
}

async function fetchText(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'TravessiaMedBot/1.0 (monitoramento de noticias oficiais da UCP; +https://travessiamed.vercel.app/)',
      Accept: 'text/html'
    }
  });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.text();
}

function parseCards(html) {
  const cards = [];
  const re = /<news-card\b([^>]*)><\/news-card>/gi;
  let match;
  while ((match = re.exec(html))) {
    const attrs = match[1];
    const get = (name) => {
      const found = attrs.match(new RegExp(`${name}="([^"]*)"`, 'i'));
      return found ? decodeAttr(found[1]) : '';
    };
    const path = get('url');
    if (!path) continue;
    cards.push({
      source_url: path.startsWith('http') ? path : `${ORIGIN}${path}`,
      source_slug: path.replace(/^.*\//, ''),
      published_at: (get('date') || '').slice(0, 10) || null,
      category: get('category') || 'UCP',
      title_es: get('news-title'),
      excerpt_es: get('summary'),
      image_url: get('thumbnail')
    });
  }
  return cards;
}

async function listingCards(maxPages) {
  const seen = new Set();
  const all = [];
  for (let page = 1; page <= maxPages; page += 1) {
    const url = page === 1 ? LISTING : `${LISTING}?page=${page}`;
    const html = await fetchText(url);
    const cards = parseCards(html);
    const fresh = cards.filter((card) => {
      if (seen.has(card.source_url)) return false;
      seen.add(card.source_url);
      return true;
    });
    if (!fresh.length) break;
    all.push(...fresh);
    await sleep(400);
  }
  return all;
}

async function articleBody(url) {
  try {
    const html = await fetchText(url);
    const block = html.match(
      /news-content__article-main-content[^>]*>([\s\S]*?)<\/section>/i
    );
    return block ? stripTags(block[1]).slice(0, 12000) : '';
  } catch {
    return '';
  }
}

const cache = new Map();

async function translateEsPt(text) {
  const src = (text || '').trim();
  if (!src) return '';
  if (cache.has(src)) return cache.get(src);

  const chunks = [];
  for (let i = 0; i < src.length; i += 420) chunks.push(src.slice(i, i + 420));

  const out = [];
  for (const chunk of chunks) {
    const endpoint = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(chunk)}&langpair=es|pt-BR`;
    try {
      const res = await fetch(endpoint, { headers: { 'User-Agent': 'TravessiaMedBot/1.0' } });
      const json = await res.json();
      const translated = json?.responseData?.translatedText;
      out.push(translated && !String(translated).includes('MYMEMORY WARNING') ? translated : chunk);
    } catch {
      out.push(chunk);
    }
    await sleep(250);
  }

  const joined = polishPt(out.join('').trim());
  cache.set(src, joined);
  return joined;
}

function polishPt(text) {
  return text
    .replace(/\bUniversidad Central del Paraguay\b/g, 'Universidad Central del Paraguay (UCP)')
    .replace(/\bCiudad del Este\b/g, 'Ciudad del Este')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function caption(item) {
  const date = item.published_at
    ? new Date(`${item.published_at}T12:00:00`).toLocaleDateString('pt-BR')
    : '';
  return [
    item.title_pt,
    '',
    item.excerpt_pt,
    '',
    date ? `Publicado em ${date}` : '',
    `Fonte oficial: ${item.source_url}`,
    '',
    '#TravessiaMed #UCP #MedicinaParaguai'
  ]
    .filter((line) => line !== '')
    .join('\n');
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function readStore() {
  if (!existsSync(STORE)) return [];
  try {
    return JSON.parse(readFileSync(STORE, 'utf8'));
  } catch {
    return [];
  }
}

function writeSiteModule(rows) {
  const slim = rows.map((row, index) => ({
    id: index + 1,
    published_at: row.published_at,
    source_url: row.source_url,
    category: row.category || 'UCP',
    title_pt: row.title_pt,
    excerpt_pt: row.excerpt_pt,
    image_url: row.image_url
  }));
  const dest = join(ROOT, 'src', 'data', 'ucpNoticias.js');
  writeFileSync(dest, `export const ucpNoticias = ${JSON.stringify(slim, null, 2)};\n`, 'utf8');
  console.log(`Site:  ${dest}`);
}

function toCsv(rows) {
  const headers = [
    'published_at',
    'title_pt',
    'excerpt_pt',
    'draft_caption_pt',
    'source_url',
    'used_for_post',
    'title_es',
    'category'
  ];
  const esc = (value) => `"${String(value ?? '').replace(/"/g, '""')}"`;
  return [headers.join(','), ...rows.map((row) => headers.map((key) => esc(row[key])).join(','))].join('\n');
}

function supabaseAdmin() {
  const url = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').replace(/\/rest\/v1\/?$/, '');
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

function ensureToken() {
  if (process.env.UCP_INGEST_TOKEN) return process.env.UCP_INGEST_TOKEN;
  const generated = randomBytes(24).toString('hex');
  console.log('\nCrie o token no Supabase (SQL Editor):\n');
  console.log(
    `insert into public.ingest_secrets (name, token) values ('ucp_noticias', '${generated}') on conflict (name) do update set token = excluded.token;`
  );
  console.log(`\nE acrescente no .env:\nUCP_INGEST_TOKEN=${generated}\n`);
  return null;
}

async function ingestRemote(items) {
  const token = process.env.UCP_INGEST_TOKEN;
  const client = supabaseAdmin();
  if (!token || !client) {
    console.log('Supabase: pulado (falta UCP_INGEST_TOKEN ou URL). Arquivo local foi gravado.');
    return;
  }
  const { data, error } = await client.rpc('ingest_ucp_noticias', {
    p_token: token,
    p_items: items
  });
  if (error) {
    console.error('Supabase:', error.message);
    console.log('Rode o supabase/schema.sql no SQL Editor e grave o token em ingest_secrets.');
    return;
  }
  console.log('Supabase upsert:', data);
}

async function runIngest() {
  mkdirSync(DATA_DIR, { recursive: true });
  const firstRun = !existsSync(STORE);
  const maxPages = firstRun ? 4 : 3;
  console.log(`Lendo ${LISTING} (até ${maxPages} páginas)...`);
  const cards = await listingCards(maxPages);
  console.log(`${cards.length} cards.`);

  const previous = readStore();
  const byUrl = new Map(previous.map((row) => [row.source_url, row]));

  const upserted = [];
  for (const card of cards) {
    const old = byUrl.get(card.source_url);
    const fingerprint = createHash('sha1')
      .update(`${card.title_es}|${card.excerpt_es}|${card.published_at}`)
      .digest('hex');
    if (old?.fingerprint === fingerprint && old.title_pt) {
      upserted.push(old);
      continue;
    }

    const title_pt = await translateEsPt(card.title_es);
    const excerpt_pt = await translateEsPt(card.excerpt_es);
    const body_es = await articleBody(card.source_url);
    const firstGraf = body_es.split(/\n{2,}/)[0] || card.excerpt_es;
    const body_pt = await translateEsPt(firstGraf.slice(0, 900));
    const item = {
      ...card,
      title_pt,
      excerpt_pt,
      body_es,
      body_pt,
      fingerprint,
      used_for_post: old?.used_for_post || false,
      used_at: old?.used_at || null,
      fetched_at: new Date().toISOString()
    };
    item.draft_caption_pt = caption(item);
    upserted.push(item);
    console.log('+', item.published_at, item.title_pt.slice(0, 80));
  }

  const merged = [...upserted];
  for (const row of previous) {
    if (!merged.some((item) => item.source_url === row.source_url)) merged.push(row);
  }
  merged.sort((a, b) => String(b.published_at).localeCompare(String(a.published_at)));

  writeStore(merged);
  writeFileSync(CSV, `\uFEFF${toCsv(merged)}\n`, 'utf8');
  writeSiteModule(merged);
  console.log(`Local: ${STORE}`);
  console.log(`CSV:   ${CSV}`);

  await ingestRemote(
    merged.slice(0, 80).map((row) => ({
      source_url: row.source_url,
      source_slug: row.source_slug,
      published_at: row.published_at,
      category: row.category,
      title_es: row.title_es,
      title_pt: row.title_pt,
      excerpt_es: row.excerpt_es,
      excerpt_pt: row.excerpt_pt,
      body_es: row.body_es,
      body_pt: row.body_pt,
      image_url: row.image_url,
      draft_caption_pt: row.draft_caption_pt
    }))
  );
}

function runExport() {
  const rows = readStore();
  mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(CSV, `\uFEFF${toCsv(rows)}\n`, 'utf8');
  const unused = join(DATA_DIR, 'ucp-noticias-para-postar.csv');
  writeFileSync(unused, `\uFEFF${toCsv(rows.filter((row) => !row.used_for_post))}\n`, 'utf8');
  console.log(`CSV completo: ${CSV}`);
  console.log(`Ainda não usados em post: ${unused} (${rows.filter((row) => !row.used_for_post).length})`);
}

const arg = process.argv[2] || '';
if (arg === '--export') {
  runExport();
} else if (arg === '--token') {
  ensureToken();
} else {
  ensureToken();
  await runIngest();
}
