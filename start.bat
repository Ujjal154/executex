@echo off
echo.
echo ========================================
echo    ExecuteX - Study Dashboard
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo ERROR: Node.js not found!
    echo Download from: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo ✓ Node.js found
echo.
echo Installing dependencies...
call npm install

if %ERRORLEVEL% neq 0 (
    echo ERROR: npm install failed
    pause
    exit /b 1
)

echo.
echo ✓ Dependencies installed
echo.
echo Starting development server...
echo.
echo ========================================
echo Open your browser:
echo   Local: http://localhost:5173
echo ========================================
echo.

npm run dev

pause
