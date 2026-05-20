# DV Portfolio — Admin & Public

Portfolio pessoal full-stack com painel de administração, construído com **Next.js 16**, **Supabase** e **Tailwind CSS v4**.

---

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Banco de dados / Auth | Supabase (PostgreSQL + RLS) |
| Estilo | Tailwind CSS v4 |
| Formulários | React Hook Form + Zod |
| Animações | Framer Motion |
| E-mail | AWS SES via API Route `/api/contact` |
| Analytics | Google Analytics 4 (`react-ga4`) + Vercel Speed Insights |
| Deploy | Vercel |

---

## Pré-requisitos

- Node.js 20+
- Conta no [Supabase](https://supabase.com)
- (Opcional) Conta AWS com SES configurado para o formulário de contato

---

## Configuração local

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Copie o arquivo de exemplo e preencha com suas credenciais:

```bash
cp .env.example .env
```

```env
# Supabase (obrigatório)
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_anon_key

# Google Analytics (opcional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# AWS SES — necessário para o formulário de contato funcionar
AWS_ACCESS_KEY_ID=sua_access_key
AWS_SECRET_ACCESS_KEY=sua_secret_key
AWS_REGION=us-east-1
ADMIN_EMAIL=seu@email.com
SES_CONFIG_SET=my-first-configuration-set
```

### 3. Aplicar migrações do banco de dados

Execute os arquivos SQL na ordem dentro do **SQL Editor** do Supabase:

```
database/migrations/
├── 2024_01_01_000000_create_projects_table.sql
├── 2024_01_01_000001_create_skills_table.sql
├── 2024_01_01_000002_create_contact_messages_table.sql
├── 2024_01_01_000003_setup_auth.sql
├── 2024_01_01_000004_add_socials_to_profile.sql
├── 2024_01_01_000005_fix_auth_profiles.sql
├── 2024_10_01_120000_create_skill_categories_table.sql
├── 2024_10_02_153000_add_category_id_to_skills_table.sql
├── 2024_11_01_000000_create_visitor_logs_table.sql
├── 2024_11_01_000001_update_profiles_and_visitors.sql
└── 2026_04_22_000000_security_hardening_rls.sql
```

Depois aplique os seeds (opcional):

```
database/seeds/
├── skill_categories_seed.sql
└── projects_seed.sql
```

---

## Iniciar o projeto

```bash
# Desenvolvimento (com Turbopack)
npm run dev
```

Acesse em **http://localhost:3000**

```bash
# Build de produção
npm run build

# Iniciar build de produção localmente
npm start

# Lint
npm run lint
```

---

## Rotas

### Público

| Rota | Descrição |
|---|---|
| `/` | Home — Hero, Projetos em destaque, Skills, Contato |
| `/projects` | Todos os projetos |
| `/contact` | Formulário de contato |

### Admin (protegido por Supabase Auth)

| Rota | Descrição |
|---|---|
| `/admin/login` | Login |
| `/admin/dashboard` | Dashboard com stats e perfil |
| `/admin/projects` | Listagem de projetos |
| `/admin/projects/[id]` | Criar (`new`) ou editar projeto |
| `/admin/skills` | Listagem de skills |
| `/admin/skills/[id]` | Criar (`new`) ou editar skill |
| `/admin/skill-categories` | Listagem de categorias |
| `/admin/skill-categories/[id]` | Criar (`new`) ou editar categoria |
| `/admin/skill-categories/[id]/skills` | Skills de uma categoria |
| `/admin/visitor-logs` | Logs de visitantes |

### API

| Rota | Método | Descrição |
|---|---|---|
| `/api/contact` | `POST` | Envia e-mail via AWS SES |
| `/api/visitors` | `POST` | Registra log de visitante |

---

## Estrutura de pastas

```
src/
├── app/                  # App Router (Next.js)
│   ├── (public)/         # Rotas públicas
│   ├── admin/            # Rotas do painel admin
│   ├── api/              # API Routes (contact, visitors)
│   ├── layout.tsx        # Root layout (providers globais)
│   └── globals.css       # CSS global + tema Tailwind
├── views/                # Componentes de página (reutilizados pelas rotas)
│   ├── public/
│   └── admin/
├── components/           # Componentes reutilizáveis
│   ├── admin/
│   ├── public/
│   ├── analytics/
│   └── ui/
├── context/              # AuthContext, LanguageContext
├── hooks/                # useVisitorTracking, useGaPageViews, ...
├── layouts/              # AdminLayout, PublicLayout
├── lib/                  # supabase.ts (browser), supabase-server.ts (server)
├── services/             # Camada de acesso a dados (Supabase)
├── types/                # Tipos TypeScript
└── proxy.ts              # Auth guard (Next.js 16 Proxy)
```

---

## Deploy na Vercel

O projeto está configurado para deploy zero-config:

```bash
# Via Vercel CLI
npx vercel --prod
```

Configure as variáveis de ambiente no dashboard da Vercel em **Settings → Environment Variables** com os mesmos valores do `.env`.

> As variáveis `AWS_*`, `ADMIN_EMAIL` e `SES_CONFIG_SET` são **server-side** — não precisam do prefixo `NEXT_PUBLIC_`.
