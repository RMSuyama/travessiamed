-- Cole só este trecho no SQL Editor e rode.

alter table public.contacts add column if not exists google_email varchar(160);

drop policy if exists contacts_public_insert on public.contacts;
drop policy if exists contacts_self_insert on public.contacts;

create policy contacts_public_insert
  on public.contacts
  for insert
  to anon, authenticated
  with check (true);

grant usage on schema public to anon, authenticated;
grant insert on table public.contacts to anon, authenticated;
