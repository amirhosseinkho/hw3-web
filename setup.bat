@echo off
echo ========================================
echo راه‌اندازی برنامه نقاشی
echo ========================================

echo.
echo مرحله 1: نصب وابستگی‌های فرانت‌اند...
npm install

echo.
echo مرحله 2: نصب وابستگی‌های سرور...
cd server
npm install
cd ..

echo.
echo ========================================
echo نصب کامل شد!
echo ========================================
echo.
echo برای راه‌اندازی سرور:
echo cd server
echo npm start
echo.
echo برای راه‌اندازی فرانت‌اند:
echo npm start
echo.
echo حساب‌های آزمایشی:
echo user1 / password123
echo user2 / password123
echo user3 / password123
echo.
pause 