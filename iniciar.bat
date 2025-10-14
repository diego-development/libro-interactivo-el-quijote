@echo off
:: Guardar la ruta actual para poder regresar a ella más tarde
set CURRENT_DIR=%cd%

:: URL por defecto del servidor preview (puedes cambiarlo si usas otro puerto)
set PREVIEW_URL=http://localhost:4173

:: Buscar la carpeta "dist" en el directorio actual o en carpetas superiores
:search_for_dist
if exist dist (
    echo Carpeta 'dist' encontrada en: %cd%
    cd dist

    :: Intentar abrir en Google Chrome
    call :open_in_chrome_or_default %PREVIEW_URL%

    :: Ejecutar el comando npm run preview dentro de la carpeta "dist"
    npm run preview
    goto end
)

:: Subir un directorio
cd ..

:: Si hemos llegado al directorio raíz, salir
if "%cd%"=="%SYSTEMDRIVE%\" (
    echo No se encontró la carpeta 'dist' en ningún directorio superior.
    goto end
)

:: Continuar buscando
goto search_for_dist

:end
:: Regresar al directorio original
cd /d %CURRENT_DIR%
goto :eof

:: Función para abrir en Chrome si está instalado, o usar el navegador predeterminado
:open_in_chrome_or_default
set URL=%1

:: Intentar con ruta típica de Chrome
set CHROME_PATH=%ProgramFiles%\Google\Chrome\Application\chrome.exe
if exist "%CHROME_PATH%" (
    start "" "%CHROME_PATH%" %URL%
    goto :eof
)

:: Intentar con ruta típica de Chrome en Program Files (x86)
set CHROME_PATH=%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe
if exist "%CHROME_PATH%" (
    start "" "%CHROME_PATH%" %URL%
    goto :eof
)

:: Si no está Chrome, usar navegador predeterminado
start "" %URL%
goto :eof
