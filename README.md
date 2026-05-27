# 1RP Travel & Expenses Portal

Expense submission and management platform for OneRallyPoint employees.

## Architecture

- **Landing Page** (`/`) — Public expense submission form (no auth required)
- **Sign In** (`/signin`) — Email/password authentication via Supabase Auth
- **Dashboard** (`/dashboard`) — Protected analytics dashboard with charts + expense table

## Tech Stack

- React 19 + Vite
- Tailwind CSS v4
- Supabase (Auth + Database)
- Recharts (charts)
- Lucide React (icons)
- Netlify (hosting)

## Setup

### 1. Supabase Database

Go to your Supabase project → SQL Editor → run `supabase/migration.sql`

### 2. Supabase Auth

In Supabase Dashboard → Authentication → Settings:
- Enable Email provider
- Create admin user(s) via Authentication → Users → Invite User

### 3. Environment Variables

Copy `.env` and update if needed:
```
VITE_SUPABASE_URL=https://hvqlhjaxqeklwhngmrhv.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### 4. Local Development

```bash
npm install
npm run dev
```

### 5. Deploy to Netlify

```bash
# Connect repo in Netlify, or:
npx netlify-cli deploy --prod
```

Set the same env vars in Netlify → Site Settings → Environment Variables.

## Flows

1. **Employee** visits `/` → fills expense form → submits → stored in Supabase
2. **Admin** visits `/signin` → authenticates → redirected to `/dashboard`
3. **Dashboard** shows KPIs, charts, filterable table → admin can approve/reject expenses
