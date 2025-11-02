@echo off
echo ========================================
echo    MSADDI.EST Website Setup
echo ========================================
echo.

echo Installing dependencies...
call npm install

if %errorlevel% neq 0 (
    echo.
    echo ERROR: Failed to install dependencies
    echo Please check your internet connection and try again
    pause
    exit /b 1
)

echo.
echo ========================================
echo    Setup Complete!
echo ========================================
echo.
echo To start the development server:
echo   npm run dev
echo.
echo Then open: http://localhost:3000
echo.
pause