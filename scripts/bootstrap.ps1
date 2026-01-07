param()
Write-Host "Bootstrap starting"
if (Test-Path ".env.example") {
  $envContent = Get-Content ".env.example"
  Write-Host "Found .env.example"
}
Write-Host "Check stack indicators"
$hasNode = Test-Path "package.json"
$hasPython = (Test-Path "requirements.txt") -or (Test-Path "pyproject.toml")
$hasRust = Test-Path "Cargo.toml"
$hasGo = Test-Path "go.mod"
Write-Host "Node:" $hasNode
Write-Host "Python:" $hasPython
Write-Host "Rust:" $hasRust
Write-Host "Go:" $hasGo
Write-Host "Bootstrap complete"
