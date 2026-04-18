@echo off
title Portfolio - Servidor de Desarrollo
echo.
echo  ╔══════════════════════════════════════╗
echo  ║   Alejandro Valle - Portfolio Dev    ║
echo  ║   http://localhost:5173              ║
echo  ╚══════════════════════════════════════╝
echo.
set PATH=C:\Program Files\nodejs;%PATH%
cd /d "%~dp0"
npm run dev
pause
