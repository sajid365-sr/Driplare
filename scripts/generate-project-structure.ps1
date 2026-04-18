<#!
  Recursively print an ASCII tree of the project (stdout).
  Excludes: node_modules, .next, .git, dist, build, coverage, .turbo, .vercel, out
  The file `PROJECT_STRUCTURE.tree.txt` (if used as a build artifact) is also omitted.
  For `PROJECT_STRUCTURE.md` at the repo root, use `emit-PROJECT-STRUCTURE-md.ps1` instead of redirecting to a temp .tree file.
#>
$ErrorActionPreference = 'Stop'

$ScriptDir = $PSScriptRoot
$ProjectRoot = Resolve-Path (Join-Path $ScriptDir '..')
$ExcludeDirs = @(
  'node_modules', '.next', '.git', 'dist', 'build', 'coverage',
  '.turbo', '.vercel', 'out'
) | ForEach-Object { $_.ToLowerInvariant() }

$ExcludeFileNames = @('PROJECT_STRUCTURE.tree.txt')

function Get-IsExcludedName([string]$name) {
  $ExcludeDirs -contains $name.ToLowerInvariant()
}

function Test-IsExcludedFile([string]$name) {
  $ExcludeFileNames -contains $name
}

function Get-SortedProjectItems {
  param([string]$DirPath)
  $all = @()
  Get-ChildItem -LiteralPath $DirPath -Force | ForEach-Object { $all += $_ }
  $dirs  = @($all | Where-Object { $_.PSIsContainer } | Sort-Object Name)
  $files = @($all | Where-Object { -not $_.PSIsContainer } | Sort-Object Name)
  return @($dirs + $files)
}

function Write-ProjectTree {
  param(
    [string] $DirPath,
    [string] $LinePrefix
  )
  $items = @(Get-SortedProjectItems -DirPath $DirPath | Where-Object {
    if ($_.PSIsContainer) {
      -not (Get-IsExcludedName $_.Name)
    } else {
      -not (Test-IsExcludedFile $_.Name)
    }
  })
  for ($i = 0; $i -lt $items.Count; $i++) {
    $item   = $items[$i]
    $isLast = $i -eq ($items.Count - 1)
    # ASCII-only branches (avoids .ps1 encoding issues on some Windows editors)
    $branch  = if ($isLast) { '\-- ' } else { '+-- ' }
    $nextPrefix = if ($isLast) { '    ' } else { '|   ' }
    $LinePrefix + $branch + $item.Name

    if ($item.PSIsContainer) {
      Write-ProjectTree -DirPath $item.FullName -LinePrefix ($LinePrefix + $nextPrefix)
    }
  }
}

$rootName = Split-Path -Path $ProjectRoot -Leaf
$rootName
Write-ProjectTree -DirPath $ProjectRoot -LinePrefix ''
