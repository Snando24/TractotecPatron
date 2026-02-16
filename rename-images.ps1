$basePath = "D:\SOFTNANTEC\TractoTec\tractotec-web\public\images\proyectos"

$folders = @(
    "$basePath\Fabricacion",
    "$basePath\Mantenimiento\auxilio-mecanico",
    "$basePath\Mantenimiento\mantenimiento-maquinaria",
    "$basePath\Mantenimiento\trabajos-mina",
    "$basePath\pintura-industrial",
    "$basePath\reparacion-pistones",
    "$basePath\Traccionamiento\reforzado_chasis",
    "$basePath\Traccionamiento\traccionamiento-cabinas",
    "$basePath\Traccionamiento\traccionamiento_chasis",
    "$basePath\Traccionamiento\virado_chasis"
)

foreach ($folder in $folders) {
    if (Test-Path $folder) {
        Write-Host "Renombrando: $folder"
        $files = Get-ChildItem -Path $folder -File | Sort-Object -Property Name
        $counter = 1
        foreach ($file in $files) {
            $ext = $file.Extension
            $newName = "img_$counter$ext"
            Rename-Item -Path $file.FullName -NewName $newName -Force
            Write-Host "  $($file.Name) -> $newName"
            $counter++
        }
    }
}

Write-Host "Completado"
