# PowerShell script to start backend with environment variables
$env:DATABASE_URL = "postgresql://postgres:postgres@localhost:5433/lcore_forms"
$env:JWT_SECRET = "please-change-me-32-chars-min"
$env:FRONTEND_ORIGIN = "http://localhost:3000"
$env:PORT = "4000"
$env:NODE_ENV = "development"

# Ensure database schema is up to date before starting dev server
Write-Host "Applying Prisma migrations (dev)..."
npx prisma migrate dev --skip-generate

npm run dev
