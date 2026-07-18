@echo off
echo ===================================================
echo   Trisector AI Innovation - Vercel Deployer
echo ===================================================
echo.
echo Step 1: Setting up Node Environment...
set PATH=C:\Users\Lenovo\OneDrive\Documents\Trisector Ai Innovation\.node\node-v20.18.0-win-x64;%PATH%

echo.
echo Step 2: Authenticating with Vercel...
cd frontend
call npx vercel login

echo.
echo Step 3: Linking Vercel project configuration...
call npx vercel pull --yes --environment=production

echo.
echo Step 4: Building production bundle locally...
call npx vercel build --prod --yes

echo.
echo Step 5: Uploading prebuilt bundle directly to Vercel...
call npx vercel deploy --prebuilt --prod --yes

echo.
echo Done! Please review the live Vercel URL printed above.
pause
