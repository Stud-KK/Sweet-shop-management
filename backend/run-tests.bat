@echo off
echo Running Backend Tests...
call mvn clean test
if errorlevel 1 (
    echo Backend tests failed!
    exit /b 1
)
echo Backend tests passed successfully!
