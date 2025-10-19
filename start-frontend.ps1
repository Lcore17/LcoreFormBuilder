# Start Frontend Server
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Starting FormBuilder Frontend" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Set-Location frontend

Write-Host "Frontend will run on: http://localhost:3000" -ForegroundColor Green
Write-Host ""

npm run dev
