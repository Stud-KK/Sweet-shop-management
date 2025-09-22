@echo off
echo 🍰 Starting Sweet Shop Management System Locally...

REM Set Maven path
set PATH=%PATH%;C:\maven\apache-maven-3.9.9\bin

echo 🚀 Starting Backend (Spring Boot)...
start "Backend" cmd /k "cd backend && mvn spring-boot:run"

echo ⏳ Waiting for backend to start...
timeout /t 10 /nobreak >nul

echo 🌐 Starting Frontend (React)...
start "Frontend" cmd /k "cd frontend && npm start"

echo ✅ Both services are starting!
echo 🌐 Frontend will be available at: http://localhost:3000
echo 🔧 Backend API will be available at: http://localhost:8080
echo 🗄️ MongoDB is running on: mongodb://localhost:27017/sweetshop

echo.
echo Press any key to exit this launcher...
pause >nul
