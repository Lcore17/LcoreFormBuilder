

<h1 align="center">Lcore Forms</h1>

<p align="center">
   <b>Full‑Stack Form Builder</b><br>
   <i>Build, share, and analyze beautiful forms with a modern UX.<br>Fast local startup, professional UI, and production‑grade APIs.</i>
</p>

<p align="center">
   <a href="https://github.com/Lcore17/LcoreFormBuilder/actions"><img src="https://img.shields.io/github/workflow/status/Lcore17/LcoreFormBuilder/CI?style=flat-square" alt="CI Status"></a>
   <a href="https://github.com/Lcore17/LcoreFormBuilder"><img src="https://img.shields.io/github/stars/Lcore17/LcoreFormBuilder?style=flat-square" alt="GitHub stars"></a>
   <a href="https://github.com/Lcore17/LcoreFormBuilder/blob/main/LICENSE"><img src="https://img.shields.io/github/license/Lcore17/LcoreFormBuilder?style=flat-square" alt="License"></a>
</p>


---

## 🚀 Overview

Lcore Forms is a modern, full‑stack form builder:

- **Frontend:** Next.js 14 (App Router) + Tailwind CSS
- **Backend:** NestJS + Prisma + PostgreSQL
- **Auth:** JWT (httpOnly cookie)

**Key Features:**
- 🛠️ Form builder with live preview & templates
- 🔗 Shareable public URLs, secure submissions
- 📊 Analytics, CSV/JSON export
- ⚙️ Advanced settings: branding, scheduling, limits, thank‑you/redirect, language, webhook, CAPTCHA
- 🕒 Version control: auto-saves, restore any version
- 🔒 Access control: password, scheduling, submission limits


## ⚡ Quick Start (Windows)

**Prerequisites:**
- Node.js 18+
- PostgreSQL (port 5433, database: `lcore_forms`)

```powershell
# Start both frontend & backend (from root)
.\start-all.ps1
```

**Open the app:**
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:4000](http://localhost:4000)

**Start individually:**
```powershell
.\start-frontend.ps1
.\start-backend.ps1
```

**Demo login:**
- Email: `demo@example.com`
- Password: `demo123`


## 🛠️ Environment Setup

**Backend** (`backend/.env`):
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/lcore_forms
JWT_SECRET=please-change-me-32-chars-min
FRONTEND_ORIGIN=http://localhost:3000
PORT=4000
NODE_ENV=development
```

**Frontend** (`frontend/.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```


## ✨ Features

<details>
<summary><b>Form Builder</b></summary>

- Live preview, drag‑friendly editing
- Text, long text, number, radio, checkbox, email
- Per‑field validation: required, min/max length, pattern, numeric ranges
- 8 professional templates
</details>

<details>
<summary><b>Advanced Settings</b></summary>

- Brand color, start/end date (scheduling), max submissions
- Thank‑you message, redirect URL, language
- Webhook URL (fire‑and‑forget), CAPTCHA toggle
- Password protection: set/remove a password per form
</details>

<details>
<summary><b>Sharing & Submissions</b></summary>

- Public form URL with secure submission API
- Server‑side validation, honeypot, schedule window enforcement, submission limits
- Password check required for protected forms
</details>

<details>
<summary><b>Analytics & Export</b></summary>

- Dashboard metrics
- CSV/JSON export endpoints
</details>

<details>
<summary><b>Version Control</b></summary>

- Automatic snapshot on create/update
- Version history listing + restore endpoint/UI
</details>

<details>
<summary><b>UX/Branding</b></summary>

- Modern landing page, dark mode, animations
- Footer and navbar adapt to auth state
</details>


## 📁 Project Structure

```text
FormBuilder/
├─ backend/        # NestJS API
│  ├─ src/
│  ├─ prisma/
│  └─ start-dev.ps1
├─ frontend/       # Next.js app
│  ├─ app/
│  ├─ components/
│  └─ lib/
├─ start-all.ps1   # Windows: start both services
├─ QUICKSTART.md   # Additional quick tips
└─ FEATURES.md     # Feature overview content
```


## 🧑‍💻 Development

**Database (from `backend`):**
```powershell
npx prisma db push         # sync schema to DB
npx prisma migrate dev     # create a migration (dev)
npx prisma db seed         # seed demo data
```

**Scripts:**
- Root: `start-all.ps1`
- Frontend only: `start-frontend.ps1`
- Backend only: `start-backend.ps1`


## 📚 API Overview

- **Auth:** `/api/auth/register`, `/api/auth/login`, `/api/auth/logout`, `/api/auth/me`
- **Forms (auth):**
   - `GET /api/forms` — list
   - `POST /api/forms` — create (advanced settings, optional password)
   - `GET /api/forms/:id` — get with fields
   - `PUT /api/forms/:id` — update (send `password: ''` to clear)
   - `DELETE /api/forms/:id` — delete
   - `GET /api/forms/:id/versions` — version history
   - `POST /api/forms/:id/restore/:versionId` — restore snapshot
   - **Public:** `GET /api/forms/public/:publicId` (no password hash, returns `passwordProtected`)
- **Submissions:**
   - **Public:** `POST /api/submissions/public/:publicId` with `{ responses, password? }`
   - **Auth:** `GET /api/submissions/form/:formId`
   - **Export:** `GET /api/submissions/export/:formId/csv`, `GET /api/submissions/export/:formId/json`


## 🔐 Security

- httpOnly cookie for JWT, guarded backend routes
- class‑validator DTOs for auth inputs; server‑side validation for submissions
- Optional password protection for public forms (bcrypt)
- Honeypot, schedule windows, max submission limits


## 🛠️ Troubleshooting

- Frontend can’t reach backend: verify `frontend/.env.local` NEXT_PUBLIC_API_URL
- DB errors: ensure Postgres on 5433 with `lcore_forms`; check `backend/.env` DATABASE_URL
- Ports in use: adjust `PORT` or stop existing processes
- CSS warnings about Tailwind `@apply`: these are editor diagnostics; Tailwind works at build time


## 🔗 Useful Links

- App: [http://localhost:3000](http://localhost:3000)
- API Docs (Swagger): [http://localhost:4000/api/docs](http://localhost:4000/api/docs)
- Health: [http://localhost:4000/api/health](http://localhost:4000/api/health)
- Feature Pages: `/features`, and Advanced Guide at `/features/guide`


---

<p align="center">
   <i>Made with care. If you ship this to production, rotate <b>JWT_SECRET</b>, secure cookies with HTTPS, and use managed Postgres.</i>
</p>
