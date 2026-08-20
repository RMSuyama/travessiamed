# Travessia Med

Site institucional e de captação da Travessia Med, construído com React, Vite e
Supabase.

## Desenvolvimento

```bash
npm install
npm run dev
```

Os formulários gravam direto na API REST do Supabase (`/rest/v1/contacts`).
Não há função serverless no Vercel.

## Rotas

- `/` — jornada acadêmica e formulário de admissão
- `/servicos` — carreto e mudança
- `/parceiros` — cadastro de prestadores
- `/privacidade` — privacidade, LGPD e termos

A rota `/shark` não aparece no menu. É o acesso interno aos contatos.

## Formulários no Supabase

No SQL Editor do Supabase, execute `supabase/schema.sql` uma vez. Depois, no
Vercel e no `.env` local, use as variáveis de `.env.example`:

- `VITE_SUPABASE_URL` — `https://ihgwaqnrnohbqmjlrgyp.supabase.co`
- `VITE_SUPABASE_ANON_KEY` — chave `anon` / `publishable` do projeto
- `VITE_TURNSTILE_SITE_KEY` — chave pública do widget Turnstile

Use só a chave anônima no frontend. A service role fica no painel do Supabase.
Os registros aparecem no painel `/shark`. O contato com o lead segue pelo WhatsApp.

### Acesso interno (`/shark`)

O painel entra com **e-mail e senha** do usuário criado em Authentication → Users.

1. Execute de novo o `supabase/schema.sql` no SQL Editor (libera leitura para quem está autenticado).
2. Em Authentication → Providers, deixe **Email** ligado.
3. No usuário criado, marque o e-mail como confirmado (ou crie com Auto Confirm).
4. Abra `/shark` e entre com esse e-mail e senha.

Não coloque valores secretos em arquivos versionados. Após alterar uma variável
com prefixo `VITE_`, faça um novo deployment para incorporá-la ao frontend.

## Verificação

```bash
npm run lint
npm run build
```
