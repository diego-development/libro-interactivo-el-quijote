@echo off
:: Guardar la ruta actual para poder regresar a ella más tarde
set CURRENT_DIR=%cd%

:: Buscar la carpeta "dist" en el directorio actual o en carpetas superiores
:search_for_dist
if exist dist (
    echo Carpeta 'dist' encontrada en: %cd%
    cd dist
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
