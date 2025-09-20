@echo off
echo Running Frontend Tests...
call npm test -- --watchAll=false
if errorlevel 1 (
    echo Frontend tests failed!
    exit /b 1
)
echo Frontend tests passed successfully!
