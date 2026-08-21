# Travessia Med

Site institucional e de captação da Travessia Med, em Next.js e Supabase.

## Desenvolvimento

```bash
npm install
npm run dev
```

Abre em `http://localhost:3000/`. Os formulários gravam direto na API REST do
Supabase (`/rest/v1/contacts`).

## Rotas

- `/` — captação: universidades, custos resumidos e formulário
- `/custos` — custo de vida e simulador
- `/familia` — espaço para pais e responsáveis
- `/duvidas` — mitos, verdades e FAQ
- `/servicos` — carreto e mudança
- `/parceiros` — cadastro de prestadores
- `/privacidade` — privacidade, LGPD e termos

A rota `/shark` não aparece no menu. É o acesso interno aos contatos.

## Formulários no Supabase

No SQL Editor do Supabase, execute `supabase/schema.sql` uma vez. Depois, no
Vercel e no `.env` local, use as variáveis de `.env.example`:

- `NEXT_PUBLIC_SUPABASE_URL` — `https://ihgwaqnrnohbqmjlrgyp.supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — chave `anon` / `publishable` do projeto
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` — chave pública do widget Turnstile

Use só a chave anônima no frontend. A service role fica no painel do Supabase.
Os registros aparecem no painel `/shark`. O contato com o lead segue pelo WhatsApp.

### Acesso interno (`/shark`)

O painel entra com **e-mail e senha** do usuário criado em Authentication → Users.
No Vercel, configure as mesmas variáveis `NEXT_PUBLIC_*`.
