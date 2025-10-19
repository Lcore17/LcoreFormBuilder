# Start Backend Server
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Starting FormBuilder Backend" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Set-Location backend

$env:DATABASE_URL = "postgresql://postgres:postgres@localhost:5433/lcore_forms"
$env:JWT_SECRET = "please-change-me-32-chars-min"
$env:FRONTEND_ORIGIN = "http://localhost:3000"
$env:PORT = "4000"
$env:NODE_ENV = "development"

Write-Host "Backend will run on: http://localhost:4000" -ForegroundColor Green
Write-Host ""

npm run start:dev
