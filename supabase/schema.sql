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
