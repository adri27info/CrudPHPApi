<?php

include("conexion.php");

function mostrarUsuarios()
{
    try {
        $query = BD::crearConexion()->query("SELECT * FROM usuarios");
        $query->execute();
        $usuarios = $query->fetchAll();
        $array = json_decode(json_encode($usuarios), true);
        return $array;
    } catch (PDOException $exception) {
        echo $exception->getMessage();
        die("[-] Error, al realizar la busqueda de usuarios");
    }
}

function registrarUsuario($id, $nombre, $direccion, $telefono)
{
    try {
        $query = BD::crearConexion()->prepare("INSERT INTO usuarios(id, nombre, direccion, telefono)
        VALUES (:id, :nombre, :direccion, :telefono)");
        $query->bindParam(':id', $id);
        $query->bindParam(':nombre', $nombre);
        $query->bindParam(':direccion', $direccion);
        $query->bindParam(':telefono', $telefono);
        return $query->execute();
    } catch (PDOException $exception) {
        echo $exception->getMessage();
        die("[-] Error, al realizar la insercion del usuario");
    }
}

function updateUsuario($id, $nombre, $direccion, $telefono)
{
    try {
        $query = BD::crearConexion()->prepare("update usuarios set nombre = :nombre, direccion = :direccion,
        telefono = :telefono where id = :id");
        $query->bindParam(':id', $id);
        $query->bindParam(':nombre', $nombre);
        $query->bindParam(':direccion', $direccion);
        $query->bindParam(':telefono', $telefono);
        $query->execute();
        return $query->rowCount();
    } catch (PDOException $exception) {
        echo $exception->getMessage();
        die("[-] Error, al realizar la actualizacion del usuario");
    }
}

function borrarUsuario($id)
{
    try {
        $query = BD::crearConexion()->prepare("delete from usuarios where id = :id");
        $query->bindParam(':id', $id);
        return $query->execute();
    } catch (PDOException $exception) {
        echo $exception->getMessage();
        die("[-] Error, al eliminar al usuario con el id: $id");
    }
}

function cerrarConexion($enlace)
{
    BD::cerrarConexion($enlace);
}
?>