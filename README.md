# Credencial Digital — Workshop MDL CWB · 4blue

App web para geração de credenciais digitais do Workshop Máquina de Lucros (Curitiba, 12/05).

## Stack

- **React 19** + **TypeScript**
- **Vite 6**
- **Tailwind CSS v4**
- **QRCode.react** — geração do QR Code
- **HTML-to-Image** — exportação em PNG (3× resolução)
- **Lucide React** — ícones

## Configuração

### 1. Clone e instale

```bash
git clone <url-do-repositorio>
cd credential-app
npm install
```

### 2. Variável de ambiente

Copie o arquivo de exemplo e preencha com a URL do seu Google Apps Script:

```bash
cp .env.example .env
```

```
VITE_WEBHOOK_URL=https://script.google.com/macros/s/SEU_SCRIPT_ID/exec
```

> Se não configurar, o app usa a URL hardcoded em `CredentialForm.tsx` como fallback.

### 3. Rode localmente

```bash
npm run dev
```

### 4. Build de produção

```bash
npm run build
```

## Estrutura de arquivos

```
src/
├── assets/
│   └── logo-workshop.svg
├── components/
│   ├── CredentialCard.tsx   # Cartão exportável com QR Code
│   └── CredentialForm.tsx   # Formulário com validação nativa
├── lib/
│   └── utils.ts             # cn() helper
├── App.tsx
├── index.css
└── main.tsx
```

## Google Apps Script

O script recebe um POST com `{ nome, email, whatsapp, timestamp }`, salva na aba `Dados` da planilha e sincroniza o contato no ActiveCampaign com a tag do evento.

Publique o script como **Web App → Anyone** e cole a URL em `.env`.

## Design

- Tema dark puro (`#000000`) + laranja neon (`hsl(39 100% 50%)`)
- Tipografia: Space Grotesk (títulos) + Inter (corpo)
- Efeitos: glow radial, glassmorphism, sombras neon
