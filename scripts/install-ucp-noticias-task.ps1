$ErrorActionPreference = "Stop"
$root = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$due = (Resolve-Path (Join-Path $PSScriptRoot "ucp-noticias-if-due.ps1")).Path

$taskDir = Join-Path $env:LOCALAPPDATA "TravessiaMed"
New-Item -ItemType Directory -Force -Path $taskDir | Out-Null
$launcher = Join-Path $taskDir "ucp-noticias.cmd"

@"
@echo off
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "$due"
"@ | Set-Content -Path $launcher -Encoding ASCII

function Register-TravessiaTask {
  param([string]$Name, [string[]]$Schedule)
  $args = @('/Create', '/TN', $Name, '/F', '/RL', 'LIMITED', '/TR', $launcher) + $Schedule
  $out = & schtasks.exe @args 2>&1
  Write-Host $out
  if ($LASTEXITCODE -ne 0) { throw "Falha ao criar $Name" }
}

Register-TravessiaTask -Name "TravessiaMed-UCP-Noticias" -Schedule @('/SC', 'DAILY', '/ST', '09:15')
try {
  Register-TravessiaTask -Name "TravessiaMed-UCP-Noticias-Logon" -Schedule @('/SC', 'ONLOGON')
} catch {
  Write-Host "Tarefa ao ligar o PC precisa de admin. A diária das 09:15 já está criada."
}

Write-Host ""
Write-Host "Agendado: todo dia 09:15 e ao ligar o PC (se já rodou nas últimas 20h, pula)."
Write-Host "Launcher: $launcher"
Write-Host "Teste agora: npm run ucp:noticias"
