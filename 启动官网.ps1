$ErrorActionPreference = 'Stop'
$siteRoot = $PSScriptRoot
$siteUrl = 'http://127.0.0.1:5188'
$running = $false
try { $health = Invoke-RestMethod "$siteUrl/__valdora_health" -TimeoutSec 2; $running = $health.app -eq 'valdora-city-atlas' } catch {}
if (-not $running) {
    $nodeExecutable = (Get-Command node -ErrorAction Stop).Source
    $serverFile = Join-Path $siteRoot 'scripts\serve.mjs'
    Start-Process -FilePath $nodeExecutable -ArgumentList ('"' + $serverFile + '"') -WorkingDirectory $siteRoot -WindowStyle Hidden
    for ($attempt = 0; $attempt -lt 30; $attempt++) {
        Start-Sleep -Milliseconds 200
        try { $health = Invoke-RestMethod "$siteUrl/__valdora_health" -TimeoutSec 1; if ($health.app -eq 'valdora-city-atlas') { $running = $true; break } } catch {}
    }
}
if (-not $running) { throw 'VALDORA server could not start. Check whether port 5188 is occupied.' }
Start-Process $siteUrl
