$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
if (-not $root) { $root = (Resolve-Path "$PSScriptRoot\..").Path }

$stamp = Join-Path $root "data\ucp-noticias.last-run"
if (Test-Path $stamp) {
  $last = [datetime]::Parse((Get-Content $stamp -Raw).Trim())
  if (((Get-Date) - $last).TotalHours -lt 20) {
    exit 0
  }
}

Set-Location $root
npm run ucp:noticias
