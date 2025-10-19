@echo off
echo ========================================
echo Starting FormBuilder Application
echo ========================================
echo.
echo Starting Backend on port 4000...
start "FormBuilder Backend" cmd /k "cd backend && set DATABASE_URL=postgresql://postgres:postgres@localhost:5433/lcore_forms && set JWT_SECRET=please-change-me-32-chars-min && set FRONTEND_ORIGIN=http://localhost:3000 && set PORT=4000 && npm run start:dev"
timeout /t 3 /nobreak >nul
echo.
echo Starting Frontend on port 3000...
start "FormBuilder Frontend" cmd /k "cd frontend && npm run dev"
echo.
echo ========================================
echo Both servers are starting...
echo Backend:  http://localhost:4000
echo Frontend: http://localhost:3000
echo ========================================
echo.
echo Press any key to exit this window (servers will keep running)...
pause >nul
