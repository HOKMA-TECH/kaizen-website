# Postman Security Baseline

Arquivo principal:
- `postman/kaizen-security.collection.json`
- `kaizen-security-advanced.collection.json`

## Como usar
1. Abra Postman.
2. Clique em **Import** e selecione `kaizen-security.collection.json`.
3. Configure as variáveis da collection:
   - `baseUrl` (ex.: `https://imobkaizen.com.br`)
   - `supabaseUrl`
   - `supabaseAnonKey`
   - `userEmail` e `userPassword` (usuário comum, opcional mas recomendado)
4. Rode a collection inteira no **Runner**.

## O que essa coleção valida
- Rotas públicas respondem sem erro 500.
- `/admin` sem login não fica aberto indevidamente.
- Escrita de CMS por usuário não-admin é bloqueada.
- Leitura pública de `page_sections` não expõe `draft` nem `is_active=false`.
- Probe simples de XSS refletido.

## Coleção avançada
Use `kaizen-security-advanced.collection.json` para validar:
- brute force (login inválido)
- enumeração de usuário
- IDOR/BOLA de leitura e escrita em `profiles`
- leitura indevida de `contact_messages`
- upload malicioso (texto em bucket de mídia)

Variáveis adicionais para avançado:
- `otherUserId` (UUID de outro usuário real para testar IDOR)

## Observações
- Alguns testes dependem de RLS no Supabase estar configurado corretamente.
- Não inclua credenciais reais em arquivos versionados.
- Para brute force/rate-limit, rode com iterações no Runner/Newman e verifique `429`.

## CI com Newman (GitHub Actions)
Workflow: `.github/workflows/security-newman.yml`

Configure estes secrets no GitHub:
- `BASE_URL`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SECURITY_USER_EMAIL`
- `SECURITY_USER_PASSWORD`
- `SECURITY_OTHER_USER_ID` (opcional, habilita os testes avançados de IDOR)
