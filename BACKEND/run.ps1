param (
    [int]$Port = 8000,
    [switch]$AllowAllCors
)

# Auto-activate local venv if present
$venvActivate = Join-Path $PSScriptRoot ".venv\Scripts\Activate.ps1"
if (Test-Path $venvActivate) {
    Write-Host "Activating virtual environment .venv" -ForegroundColor Cyan
    . $venvActivate
}

# Optionally allow all CORS for local dev
if ($AllowAllCors.IsPresent) {
    $env:CORS_ALLOW_ALL = 'true'
    Write-Host "CORS_ALLOW_ALL enabled for dev" -ForegroundColor Yellow
}

# Ensure uvicorn is available in the current Python environment
python -c "import importlib,sys; sys.exit(0 if importlib.util.find_spec('uvicorn') else 1)" | Out-Null
$hasUvicorn = $LASTEXITCODE -eq 0

if (-not $hasUvicorn) {
    Write-Host "Installing dependencies (requires internet)..." -ForegroundColor Yellow
    python -m pip install --upgrade pip
    python -m pip install -r (Join-Path $PSScriptRoot 'requirements.txt')
}

Write-Host "Starting FastAPI on port $Port" -ForegroundColor Green
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port $Port
