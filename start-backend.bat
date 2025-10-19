@echo off
cd backend
set DATABASE_URL=postgresql://postgres:postgres@localhost:5433/lcore_forms
set JWT_SECRET=please-change-me-32-chars-min
set FRONTEND_ORIGIN=http://localhost:3000
set PORT=4000
set NODE_ENV=development
echo Starting Backend Server...
npm run start:dev
