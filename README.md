<div align="center">

# Lcore Forms — Full‑Stack Form Builder

Build, share, and analyze beautiful forms with a modern UX. Fast local startup, professional UI, and production‑grade APIs.

</div>

## Overview

Lcore Forms is a full‑stack form builder built with:
- Frontend: Next.js 14 (App Router) + Tailwind CSS
- Backend: NestJS + Prisma + PostgreSQL
- Auth: JWT (httpOnly cookie)

Key capabilities:
- Form builder with live preview and templates
- Shareable public form URLs and secure submissions
- Analytics, CSV/JSON export
- Advanced settings: branding color, scheduling (start/end), max submissions, thank‑you/redirect, language, webhook, CAPTCHA
- Version control: automatically saves form versions; restore any previous version
- Access control: password‑protected forms, start/end date windows, submission limits

## Quick Start (Windows)

Prerequisites:
- Node.js 18+
- PostgreSQL running on port 5433 with database `lcore_forms`

1) Start everything (root folder):
```powershell
.\n+start-all.ps1
```

2) Open the app:
- Frontend: http://localhost:3000
- Backend: http://localhost:4000

Optional single services:
```powershell
.\n+start-frontend.ps1
.
start-backend.ps1
```

Demo login:
- Email: demo@example.com
- Password: demo123

## Environment

Backend (`backend/.env`):
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/lcore_forms
JWT_SECRET=please-change-me-32-chars-min
FRONTEND_ORIGIN=http://localhost:3000
PORT=4000
NODE_ENV=development
```

Frontend (`frontend/.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## Features

- Form Builder
   - Live preview, drag‑friendly editing
   - Text, long text, number, radio, checkbox, email
   - Per‑field validation: required, min/max length, pattern, numeric ranges
   - 8 professional templates
- Advanced Settings
   - Brand color, start/end date (scheduling), max submissions
   - Thank‑you message, redirect URL, language
   - Webhook URL (fire‑and‑forget), CAPTCHA toggle
   - Password protection: set/remove a password per form
- Sharing & Submissions
   - Public form URL with secure submission API
   - Server‑side validation, honeypot, schedule window enforcement, submission limits
   - Password check required for protected forms
- Analytics & Export
   - Dashboard metrics
   - CSV/JSON export endpoints
- Version Control
   - Automatic snapshot on create/update
   - Version history listing + restore endpoint/UI
- UX/Branding
   - Modern landing page, dark mode, animations
   - Footer and navbar adapt to auth state

## Project Structure

```
FormBuilder/
├─ backend/                 # NestJS API
│  ├─ src/
│  ├─ prisma/
│  └─ start-dev.ps1
├─ frontend/                # Next.js app
│  ├─ app/
│  ├─ components/
│  └─ lib/
├─ start-all.ps1            # Windows: start both services
├─ QUICKSTART.md            # Additional quick tips
└─ FEATURES.md              # Feature overview content
```

## Development

Database (from `backend`):
```powershell
npx prisma db push         # sync schema to DB
npx prisma migrate dev     # create a migration (dev)
npx prisma db seed         # seed demo data
```

Scripts:
- Root: `start-all.ps1`
- Frontend only: `start-frontend.ps1`
- Backend only: `start-backend.ps1`

## API Overview

- Auth: `/api/auth/register`, `/api/auth/login`, `/api/auth/logout`, `/api/auth/me`
- Forms (auth):
   - `GET /api/forms` list
   - `POST /api/forms` create (includes advanced settings and optional password)
   - `GET /api/forms/:id` get with fields
   - `PUT /api/forms/:id` update (send `password: ''` to clear)
   - `DELETE /api/forms/:id` delete
   - `GET /api/forms/:id/versions` version history
   - `POST /api/forms/:id/restore/:versionId` restore snapshot
   - Public: `GET /api/forms/public/:publicId` (omits password hash, returns `passwordProtected`)
- Submissions:
   - Public: `POST /api/submissions/public/:publicId` with `{ responses, password? }`
   - Auth: `GET /api/submissions/form/:formId`
   - Export: `GET /api/submissions/export/:formId/csv`, `GET /api/submissions/export/:formId/json`

## Security

- httpOnly cookie for JWT, guarded backend routes
- class‑validator DTOs for auth inputs; server‑side validation for submissions
- Optional password protection for public forms (bcrypt)
- Honeypot, schedule windows, max submission limits

## Troubleshooting

- Frontend can’t reach backend: verify `frontend/.env.local` NEXT_PUBLIC_API_URL
- DB errors: ensure Postgres on 5433 with `lcore_forms`; check `backend/.env` DATABASE_URL
- Ports in use: adjust `PORT` or stop existing processes
- CSS warnings about Tailwind `@apply`: these are editor diagnostics; Tailwind works at build time

## Useful Links

- App: http://localhost:3000
- API Docs (Swagger): http://localhost:4000/api/docs
- Health: http://localhost:4000/api/health
- Feature Pages: `/features`, and Advanced Guide at `/features/guide`

---

Made with care. If you ship this to production, rotate JWT_SECRET, secure cookies with HTTPS, and configure a managed Postgres.
