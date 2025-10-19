# Start Both Backend and Frontend Servers
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Starting FormBuilder Application" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Start Backend in new window
Write-Host "Starting Backend Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend'; `$env:DATABASE_URL='postgresql://postgres:postgres@localhost:5433/lcore_forms'; `$env:JWT_SECRET='please-change-me-32-chars-min'; `$env:FRONTEND_ORIGIN='http://localhost:3000'; `$env:PORT='4000'; Write-Host 'Backend Server Starting...' -ForegroundColor Green; npm run start:dev"

Start-Sleep -Seconds 3

# Start Frontend in new window
Write-Host "Starting Frontend Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\frontend'; Write-Host 'Frontend Server Starting...' -ForegroundColor Green; npm run dev"

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Servers are starting in separate windows!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Backend:  http://localhost:4000" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Open http://localhost:3000 in your browser" -ForegroundColor Yellow
Write-Host ""
Write-Host "Press any key to exit (servers will keep running)..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
