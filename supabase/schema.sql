-- Cole no SQL Editor e execute.
-- Formulário público grava com Gmail. Painel /shark continua no usuário do Auth.

create table if not exists public.contacts (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  type varchar(20) not null,
  type_label varchar(80) not null,
  name varchar(120) not null,
  whatsapp varchar(40) not null,
  location varchar(120) not null,
  interest varchar(160) not null,
  semester varchar(80),
  housing varchar(160),
  experience text,
  source varchar(300),
  status varchar(30) not null default 'novo'
);

alter table public.contacts add column if not exists auth_user_id uuid;
alter table public.contacts add column if not exists google_email varchar(160);
alter table public.contacts add column if not exists admin_notes text;
alter table public.contacts add column if not exists updated_at timestamptz;

create index if not exists contacts_created_at_idx
  on public.contacts (created_at desc);

drop index if exists contacts_one_per_user_type;
create unique index if not exists contacts_one_per_gmail_type
  on public.contacts (lower(google_email), type)
  where google_email is not null;

alter table public.contacts drop constraint if exists contacts_type_check;
alter table public.contacts
  add constraint contacts_type_check check (type in ('admission', 'partner'));

alter table public.contacts enable row level security;

create table if not exists public.admin_allowlist (
  email text primary key,
  created_at timestamptz not null default now()
);

insert into public.admin_allowlist (email)
values ('rafaelmoreirasuyama@gmail.com')
on conflict (email) do nothing;

alter table public.admin_allowlist enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_allowlist
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

drop policy if exists contacts_public_insert on public.contacts;
drop policy if exists contacts_self_insert on public.contacts;
drop policy if exists contacts_admin_select on public.contacts;
drop policy if exists contacts_admin_update on public.contacts;
drop policy if exists contacts_self_select on public.contacts;
drop policy if exists admin_allowlist_admin_all on public.admin_allowlist;

create policy contacts_public_insert
  on public.contacts
  for insert
  to anon, authenticated
  with check (true);

create policy contacts_admin_select
  on public.contacts
  for select
  to authenticated
  using (public.is_admin());

create policy contacts_admin_update
  on public.contacts
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy admin_allowlist_admin_all
  on public.admin_allowlist
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

grant usage on schema public to anon, authenticated;
grant insert on table public.contacts to anon, authenticated;
grant select, update on table public.contacts to authenticated;
grant select, insert, delete on table public.admin_allowlist to authenticated;

-- Notícias da UCP (fonte oficial). O site público só lê título/resumo em PT.
create table if not exists public.ucp_noticias (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  fetched_at timestamptz not null default now(),
  published_at date,
  source_url text not null unique,
  source_slug text,
  category text,
  title_es text,
  title_pt text,
  excerpt_es text,
  excerpt_pt text,
  body_es text,
  body_pt text,
  image_url text,
  draft_caption_pt text,
  used_for_post boolean not null default false,
  used_at timestamptz
);

create index if not exists ucp_noticias_published_idx
  on public.ucp_noticias (published_at desc nulls last, id desc);

alter table public.ucp_noticias enable row level security;

create or replace view public.ucp_noticias_public as
select
  id,
  published_at,
  source_url,
  category,
  title_pt,
  excerpt_pt,
  image_url
from public.ucp_noticias
where title_pt is not null and title_pt <> '';

create table if not exists public.ingest_secrets (
  name text primary key,
  token text not null,
  created_at timestamptz not null default now()
);

alter table public.ingest_secrets enable row level security;

drop policy if exists ucp_noticias_public_select on public.ucp_noticias;
drop policy if exists ucp_noticias_admin_all on public.ucp_noticias;
drop policy if exists ingest_secrets_admin_all on public.ingest_secrets;

create policy ucp_noticias_admin_select
  on public.ucp_noticias
  for select
  to authenticated
  using (public.is_admin());

create policy ucp_noticias_admin_all
  on public.ucp_noticias
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy ingest_secrets_admin_all
  on public.ingest_secrets
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create or replace function public.ingest_ucp_noticias(p_token text, p_items jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  n int := 0;
begin
  if p_token is null or p_token = '' or not exists (
    select 1 from public.ingest_secrets
    where name = 'ucp_noticias' and token = p_token
  ) then
    raise exception 'unauthorized';
  end if;

  insert into public.ucp_noticias (
    source_url,
    source_slug,
    published_at,
    category,
    title_es,
    title_pt,
    excerpt_es,
    excerpt_pt,
    body_es,
    body_pt,
    image_url,
    draft_caption_pt,
    fetched_at
  )
  select
    x->>'source_url',
    x->>'source_slug',
    nullif(x->>'published_at', '')::date,
    x->>'category',
    x->>'title_es',
    x->>'title_pt',
    x->>'excerpt_es',
    x->>'excerpt_pt',
    x->>'body_es',
    x->>'body_pt',
    x->>'image_url',
    x->>'draft_caption_pt',
    now()
  from jsonb_array_elements(p_items) as x
  on conflict (source_url) do update set
    source_slug = excluded.source_slug,
    published_at = coalesce(excluded.published_at, public.ucp_noticias.published_at),
    category = excluded.category,
    title_es = excluded.title_es,
    title_pt = excluded.title_pt,
    excerpt_es = excluded.excerpt_es,
    excerpt_pt = excluded.excerpt_pt,
    body_es = excluded.body_es,
    body_pt = excluded.body_pt,
    image_url = excluded.image_url,
    draft_caption_pt = excluded.draft_caption_pt,
    fetched_at = now();

  get diagnostics n = row_count;
  return jsonb_build_object('upserted', n);
end;
$$;

revoke all on function public.ingest_ucp_noticias(text, jsonb) from public;
grant execute on function public.ingest_ucp_noticias(text, jsonb) to anon, authenticated;

grant select on table public.ucp_noticias to authenticated;
grant select, update on table public.ucp_noticias to authenticated;
grant select on public.ucp_noticias_public to anon, authenticated;
grant select, insert, update, delete on table public.ingest_secrets to authenticated;
