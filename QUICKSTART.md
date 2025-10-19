# 🚀 FormBuilder - Quick Start Guide

A professional full-stack form builder with templates, real-time preview, and analytics.

---

## ⚡ QUICK START (Choose One)

### Option 1: Run Everything at Once (Easiest! ⭐)
**Windows Users:**
1. Double-click **`start-all.bat`** or **`start-all.ps1`** in the root folder
2. Wait for both servers to start
3. Open http://localhost:3000 in your browser

### Option 2: Run Servers Separately
**Terminal 1 (Backend):**
- Double-click `start-backend.bat` or `start-backend.ps1`

**Terminal 2 (Frontend):**
- Double-click `start-frontend.bat` or `start-frontend.ps1`

---

## 🌐 Access Points

- **Frontend App**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **Health Check**: http://localhost:4000/api/health

### Demo Login (if seeded)
- **Email**: demo@example.com
- **Password**: demo123

---

## 📋 Prerequisites Checklist

- ✅ PostgreSQL running on port **5433**
- ✅ Database `lcore_forms` created
- ✅ Node.js 18+ installed
- ✅ Dependencies installed:
  ```bash
  cd backend && npm install
  cd ../frontend && npm install
  ```

---

## 🔧 First Time Setup

### 1. Install Dependencies
```powershell
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

### 2. Setup Database
```powershell
cd backend
npx prisma migrate dev
npx prisma db seed  # Optional: adds demo data
```

### 3. Start Application
Double-click **`start-all.bat`** or **`start-all.ps1`**

---

## 🎯 Features

### ✨ Templates System
- 📧 Contact Form
- 💬 Feedback Form
- 📅 Event Registration
- ⭐ Customer Survey
- 💼 Job Application
- ❤️ RSVP Form
- 🛍️ Order Form
- 📄 Blank Template

### 📝 Form Builder
- Real-time live preview
- 5 field types (Text, Textarea, Number, Radio, Checkbox)
- Required fields toggle
- Custom options for multiple choice
- Public/Private visibility

### 📊 Dashboard
- All forms at a glance
- Search functionality
- Quick actions: Edit, Delete, Copy link, View responses
- Real-time metrics (Total Forms, Responses, Averages)

### 🎨 UI/UX
- Professional white/blue theme
- Dark mode support
- Smooth animations
- Fully responsive (mobile, tablet, desktop)
- Accessibility support

### 🔐 Security
- JWT authentication with httpOnly cookies
- bcrypt password hashing
- Protected routes with loading states
- CORS configured

### 🔗 Sharing
- Public form links (no login required)
- Copy link button
- Open in new tab
- Works on any device/browser

---

## 📁 Project Structure

```
FormBuilder/
├── backend/              # NestJS API server (Port 4000)
│   ├── src/
│   │   ├── auth/        # Authentication
│   │   ├── forms/       # Form CRUD
│   │   ├── submissions/ # Form responses
│   │   └── users/       # User management
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── .env
│   └── package.json
│
├── frontend/             # Next.js App (Port 3000)
│   ├── app/
│   │   ├── forms/       # Dashboard, Builder, Editor
│   │   ├── public/      # Public form submissions
│   │   ├── login/       # Auth pages
│   │   ├── privacy/     # Legal pages
│   │   └── terms/
│   ├── components/
│   ├── lib/
│   └── package.json
│
├── start-all.bat         # Quick start (CMD)
├── start-all.ps1         # Quick start (PowerShell)
├── start-backend.bat     # Backend only (CMD)
├── start-backend.ps1     # Backend only (PowerShell)
├── start-frontend.bat    # Frontend only (CMD)
├── start-frontend.ps1    # Frontend only (PowerShell)
├── FEATURES.md           # Complete feature list
└── README.md             # This file
```

---

## 🛠️ Tech Stack

**Frontend:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- SWR for data fetching
- lucide-react icons

**Backend:**
- NestJS 10
- Prisma ORM
- PostgreSQL
- JWT Authentication
- bcrypt

---

## 🎨 How to Use

### Creating Forms from Templates
1. Go to http://localhost:3000
2. Sign up / Login
3. Click **"Templates"** button
4. Choose from 8 pre-built templates
5. Customize fields as needed
6. Click **"Save Form"**

### Creating Custom Forms
1. Click **"New Form"**
2. Add fields (Text, Number, Radio, etc.)
3. Toggle required fields
4. Add options for multiple choice
5. Preview in real-time on the right
6. Click **"Save Form"**

### Sharing Forms
1. Go to Dashboard
2. Find your form
3. Click **"Copy"** button (📋 icon)
4. Share the public link anywhere
5. Recipients submit without login!

### Editing Forms
1. Click **"Edit"** button (✏️ icon) on form card
2. Modify title, description, or fields
3. Click **"Save Changes"**

### Viewing Responses
1. Click **"Responses"** button (📊 icon)
2. View all submissions
3. Export as CSV or JSON

### Deleting Forms
1. Click **"Delete"** button (🗑️ icon)
2. Confirm deletion
3. Form and responses removed

---

## 🐛 Troubleshooting

### Backend won't start
- ✅ Check if PostgreSQL is running: `Get-Service postgresql*`
- ✅ Verify port 5433 is correct
- ✅ Check .env file exists: `backend/.env`
- ✅ Run migrations: `cd backend && npx prisma migrate dev`

### Frontend won't start
- ✅ Check port 3000 is available
- ✅ Install dependencies: `cd frontend && npm install`
- ✅ Delete `.next` folder and restart

### Database connection error
```
PrismaClientInitializationError: database doesn't exist
```
**Fix:** Create the database:
```sql
CREATE DATABASE lcore_forms;
```

### Port already in use
**Fix:** Kill the process or change ports:
```powershell
# Find process using port
netstat -ano | findstr :3000
# Kill process
taskkill /PID <process_id> /F
```

### Environment variables not loading
- ✅ Use the provided `.bat` or `.ps1` scripts
- ✅ They automatically set all required env vars
- ✅ Don't use `npm run` directly without setting vars first

---

## 📞 Contact & Support

- **Email**: nikhiltandel2802@gmail.com
- **GitHub**: [Lcore17](https://github.com/Lcore17)
- **Twitter**: [@deltalcore](https://twitter.com/deltalcore)

---

## 📄 Additional Documentation

- **FEATURES.md** - Complete feature list with details
- **frontend/README.md** - Frontend-specific docs
- **backend/README.md** - Backend API documentation

---

## 🎉 You're All Set!

1. ✅ Double-click `start-all.bat` or `start-all.ps1`
2. ✅ Wait for "Ready in..." message
3. ✅ Open http://localhost:3000
4. ✅ Sign up and start building forms!

**Enjoy your FormBuilder! 🚀📋✨**

---

*Made with ❤️ by Lcore*
