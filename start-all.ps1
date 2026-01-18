# Script para iniciar todos los proyectos de SmartFood

Write-Host "==================================" -ForegroundColor Green
Write-Host "SmartFood - Iniciando proyectos" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Green
Write-Host ""

$baseDir = $PSScriptRoot

# Cliente Principal (Puerto 5173)
Write-Host "Iniciando Cliente Principal en puerto 5173..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$baseDir\Smartfood_Client'; Write-Host 'CLIENTE PRINCIPAL - Puerto 5173' -ForegroundColor Green; npm run dev"

Start-Sleep -Seconds 2

# Dashboard Admin (Puerto 5174)
Write-Host "Iniciando Dashboard Admin en puerto 5174..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$baseDir\Smartfood_Dashboard'; Write-Host 'DASHBOARD ADMIN - Puerto 5174' -ForegroundColor Yellow; npm run dev"

Start-Sleep -Seconds 2

# Shop (Puerto 5175)
Write-Host "Iniciando Shop en puerto 5175..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$baseDir\Smartfood_Shop'; Write-Host 'SHOP - Puerto 5175' -ForegroundColor Magenta; npm run dev"

Write-Host ""
Write-Host "==================================" -ForegroundColor Green
Write-Host "Todos los proyectos se están iniciando..." -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Green
Write-Host ""
Write-Host "URLs:" -ForegroundColor White
Write-Host "  Cliente:   http://localhost:5173" -ForegroundColor Cyan
Write-Host "  Dashboard: http://localhost:5174" -ForegroundColor Yellow
Write-Host "  Shop:      http://localhost:5175" -ForegroundColor Magenta
Write-Host ""
Write-Host "Presiona Ctrl+C en cada ventana para detener los servidores" -ForegroundColor Gray
