$ErrorActionPreference = 'Stop'
try {
    $health = Invoke-RestMethod 'http://127.0.0.1:5188/__valdora_health' -TimeoutSec 2
    if ($health.app -eq 'valdora-city-atlas') {
        $serverProcess = Get-CimInstance Win32_Process -Filter "ProcessId = $($health.pid)"
        $expectedScript = Join-Path $PSScriptRoot 'scripts\serve.mjs'
        if ($serverProcess.CommandLine -and $serverProcess.CommandLine.Contains($expectedScript)) { Stop-Process -Id $health.pid }
    }
} catch { Write-Host 'VALDORA local server is not running.' }
