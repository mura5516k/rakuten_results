@echo off
setlocal

cd /d "%~dp0"

set "npm_config_cache=%CD%\.npm-cache"

if not exist "node_modules" (
  echo Installing dependencies...
  call npm install
  if errorlevel 1 (
    echo.
    echo npm install failed.
    pause
    exit /b 1
  )
)

echo.
echo Starting Vite dev server on host 0.0.0.0...
echo Open the displayed URL on your PC or phone.
echo.

call npm run dev:host

endlocal
