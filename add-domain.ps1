# PowerShell Script to add domain to Vercel
# Run this in PowerShell on Windows

Write-Host "Adding domains to Vercel..." -ForegroundColor Green

# Install Vercel CLI if not installed
npm install -g vercel

# Login to Vercel
Write-Host "Logging in to Vercel..." -ForegroundColor Yellow
vercel login

# Link to project
Write-Host "Linking to project..." -ForegroundColor Yellow
vercel link

# Add domains
Write-Host "Adding www.msaddi.com..." -ForegroundColor Yellow
vercel domains add www.msaddi.com

Write-Host "Adding msaddi.com..." -ForegroundColor Yellow
vercel domains add msaddi.com

Write-Host "Done! Domains added successfully." -ForegroundColor Green
Write-Host "Check status at: https://vercel.com/dashboard" -ForegroundColor Cyan
