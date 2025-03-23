::path client
set REACT_APP_PATH=D:\employee-management\employee-management.client
:: path wwwroot  ASP.NET
set ASP_WWWROOT=D:\employee-management\employee-management.Server\wwwroot
:: path project ASP.NET
set ASP_PROJECT_PATH=D:\employee-management\employee-management.Server
::  publish output
set PUBLISH_PATH=D:\employee-build


echo Build ReactJS...
cd /d %REACT_APP_PATH%
call npm install
call npm run build

echo clear folder wwwroot...
rmdir /s /q %ASP_WWWROOT%
mkdir %ASP_WWWROOT%

echo Copy build React in wwwroot...
xcopy /E /I /Y "%REACT_APP_PATH%\dist\*" "%ASP_WWWROOT%\"

echo Clean project ASP.NET...
cd /d %ASP_PROJECT_PATH%
dotnet clean

echo Publish ASP.NET project...
dotnet publish -c Release -o %PUBLISH_PATH%

echo Completed deploy!
pause