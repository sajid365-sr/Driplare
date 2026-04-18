# Writes [PROJECT_STRUCTURE.md] at the repo root from generate-project-structure.ps1 output.
$ErrorActionPreference = 'Stop'
$root = Resolve-Path (Join-Path $PSScriptRoot '..')
$out = Join-Path $root 'PROJECT_STRUCTURE.md'
$gen = Join-Path $PSScriptRoot 'generate-project-structure.ps1'
$tree = & $gen | Out-String
$date = (Get-Date -Format 'yyyy-MM-dd')
# Triple backtick fences
$fence3 = '```'
$nl = [Environment]::NewLine
$psBlock = @(
  '## Regenerate', '', 'From the project root, in **PowerShell**:', '', ($fence3 + 'powershell'),
  'powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\emit-PROJECT-STRUCTURE-md.ps1',
  $fence3, '', 'Or print the tree to the console only:', '', ($fence3 + 'powershell'),
  'powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\generate-project-structure.ps1',
  $fence3, '', '## Tree (ASCII)', '', $fence3,
  $tree.TrimEnd().Trim(), $fence3
) -join $nl
$md = @"
# Project file and folder structure

Generated: $date (local date when this file was last built).

Omitted from the tree: ``node_modules``, ``.next``, ``.git``, and common build/cache folders (``dist``, ``build``, ``coverage``, ``.turbo``, ``.vercel``, ``out``). See [scripts/generate-project-structure.ps1](scripts/generate-project-structure.ps1) and [scripts/emit-PROJECT-STRUCTURE-md.ps1](scripts/emit-PROJECT-STRUCTURE-md.ps1).

$psBlock
"@
$md | Set-Content -Path $out -Encoding utf8
Write-Host "Wrote $out"
