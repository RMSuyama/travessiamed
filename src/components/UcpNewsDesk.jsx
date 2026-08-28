'use client';

import { useMemo, useState } from 'react';
import { supabase } from '../utils/supabaseClient';

function formatDay(value) {
  if (!value) return '';
  return new Date(`${value}T12:00:00`).toLocaleDateString('pt-BR');
}

export default function UcpNewsDesk({ rows, onChange }) {
  const [query, setQuery] = useState('');
  const [onlyUnused, setOnlyUnused] = useState(true);
  const [busyId, setBusyId] = useState(null);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return rows.filter((row) => {
      if (onlyUnused && row.used_for_post) return false;
      if (!needle) return true;
      return `${row.title_pt} ${row.title_es} ${row.excerpt_pt}`.toLowerCase().includes(needle);
    });
  }, [rows, query, onlyUnused]);

  const copyCaption = async (row) => {
    const text = row.draft_caption_pt || `${row.title_pt}\n\n${row.excerpt_pt}\n\n${row.source_url}`;
    await navigator.clipboard.writeText(text);
  };

  const markUsed = async (row, used) => {
    setBusyId(row.id);
    const { error } = await supabase
      .from('ucp_noticias')
      .update({ used_for_post: used, used_at: used ? new Date().toISOString() : null })
      .eq('id', row.id);
    setBusyId(null);
    if (!error) onChange?.();
  };

  const downloadCsv = () => {
    const headers = ['published_at', 'title_pt', 'excerpt_pt', 'draft_caption_pt', 'source_url', 'used_for_post'];
    const esc = (value) => `"${String(value ?? '').replace(/"/g, '""')}"`;
    const csv = [
      headers.join(','),
      ...filtered.map((row) => headers.map((key) => esc(row[key])).join(','))
    ].join('\n');
    const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ucp-noticias-para-postar.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <section className="shark-toolbar">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar título"
        />
        <label className="shark-check">
          <input
            type="checkbox"
            checked={onlyUnused}
            onChange={(event) => setOnlyUnused(event.target.checked)}
          />
          Só o que ainda não virou post
        </label>
        <button type="button" onClick={downloadCsv}>Baixar CSV</button>
        <strong>{filtered.length}</strong>
      </section>

      <div className="shark-table-wrap">
        <table className="shark-table">
          <thead>
            <tr>
              <th>Data</th>
              <th>Título PT</th>
              <th>Resumo</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr key={row.id}>
                <td>{formatDay(row.published_at)}</td>
                <td>
                  <strong>{row.title_pt}</strong>
                  <small>
                    <a href={row.source_url} target="_blank" rel="noreferrer">original UCP</a>
                  </small>
                </td>
                <td>{row.excerpt_pt}</td>
                <td>
                  <button type="button" className="shark-edit-btn" onClick={() => copyCaption(row)}>
                    Copiar legenda
                  </button>
                  <button
                    type="button"
                    className="shark-edit-btn"
                    disabled={busyId === row.id}
                    onClick={() => markUsed(row, !row.used_for_post)}
                  >
                    {row.used_for_post ? 'Desmarcar' : 'Já postei'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="shark-quiet">Nenhuma notícia. Rode npm run ucp:noticias no PC.</p>
        )}
      </div>
    </>
  );
}
