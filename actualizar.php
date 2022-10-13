<?php
if (count($_GET) === 0) {
    header('Location: index.html');
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crud php api</title>
    <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <link rel="stylesheet" href="css/estilos.css">
    <script src="js/validacion.js" defer></script>
</head>

<body>
    <header>
        <h1>Actualizar usuario</h1>
    </header>
    <main>
        <form id="formulario" class="formulario actualizar" action="<?php echo htmlentities($_SERVER['PHP_SELF']); ?>"
            method="POST">
            <input type="hidden" name="_method" value="put" />
            <input type="hidden" name="id_usuario" value="<?php echo $_GET["id"]; ?>" />
            <label for="nombre_usuario">Nombre: </label>
            <input type="text" name="nombre_usuario" id="nombre_usuario" placeholder="Introduce el nombre del usuario"
                value="<?php echo $_GET["nombre"];  ?>">
            <div class="contenedorNombreUsuario ocultar" id="contenedorNombreUsuario">
                <span class="material-symbols-outlined"> person </span>
                <span id="error_usuario" class="error_usuario">Error [-3, +20]. El nombre no puede incluir
                    numeros</span>
            </div>
            <label for="direccion_usuario">Direccion: </label>
            <input type="text" name="direccion_usuario" id="direccion_usuario"
                placeholder="Introduce la direccion del usuario" value='<?php echo $_GET["direccion"];  ?>'>
            <div class="contenedorDireccionUsuario ocultar" id="contenedorDireccionUsuario">
                <span class="material-symbols-outlined"> pin_drop </span>
                <span id="error_direccion" class="error_direccion">Error [-4, +20]. Debes introdir minimo 4 y maximo
                    20
                    caracteres</span>
            </div>
            <label for="telefono_usuario">Telefono: </label>
            <input type="text" name="telefono_usuario" id="telefono_usuario"
                placeholder="Introduce el telefono del usuario" value='<?php echo $_GET["telefono"];  ?>'>
            <div class="contenedorTelefonoUsuario ocultar" id="contenedorTelefonoUsuario">
                <span class="material-symbols-outlined"> call </span>
                <span id="error_telefono" class="error_telefono">Error[-9, +9]. El telefono tiene que empezar entre
                    los
                    numeros {6,7,9}</span>
            </div>
            <input type="submit" value="Enviar" name="btnEnviar" id="btnEnviar">
        </form>
        <div class="atras">
            <a href="index.html">Volver atras</a>
        </div>
        <div class="containerDatos ocultar" id="containerDatos">
            <span class="material-symbols-outlined">
            </span>
            <span id="mensaje_datos"></span>
        </div>
    </main>
</body>

</html>