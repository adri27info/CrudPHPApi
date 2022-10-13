<?php

include("utilidades.php");
header('Content-Type: application/json; charset=utf-8');

switch($_SERVER["REQUEST_METHOD"]) {
    case "GET":
        enviarUsuarios();
    break;
    case "POST":
        insertarUsuario();
    break;
    case "PUT":
       actualizarUsuario();
    break;
    case "DELETE":
        eliminarUsuario();
    break;
    default:
    break;
}

function enviarUsuarios() {
    $usuarios = mostrarUsuarios();
    if (count($usuarios) > 0) {
        echo json_encode(array("exito"=> $usuarios)); 
    }else{
        echo json_encode(array("error"=> "No existen usuarios"));
    }
}

function insertarUsuario() {
    $data = json_decode(file_get_contents('php://input'), true);
    if (count($data) === 4) {
        $usuarioInsertado = registrarUsuario($data["id_usuario"], $data["nombre_usuario"],$data["direccion_usuario"],$data["telefono_usuario"]);
        if ($usuarioInsertado != 0) {
            echo json_encode(array("exito"=> "El usuario ha sido insertado, volviendo a la pagina principal...")); 
        }else{
            echo json_encode(array("error"=> "El usuario no se ha podio insertar"));
        }
    }
}

function actualizarUsuario() {
    $data = json_decode(file_get_contents('php://input'), true);
    if (count($data) === 4) {
        $usuarioActualizado = updateUsuario($data["id_usuario"], $data["nombre_usuario"],$data["direccion_usuario"],$data["telefono_usuario"]);
        if ($usuarioActualizado != 0) {
            echo json_encode(array("exito"=> "El usuario ha sido actualizado, volviendo a la pagina principal...")); 
        }else{
            echo json_encode(array("exito"=> "El usuario ha sido actualizado con los mismos campos, volviendo a la pagina principal..."));
        }
    }
}

function eliminarUsuario() {
    $data = json_decode(file_get_contents('php://input'), true);
    if (count($data) === 1) {
        $usuarioBorrado = borrarUsuario($data["id_usuario"]);
        if ($usuarioBorrado != 0) {
            echo json_encode(array("exito"=> "El usuario ha sido borrado, volviendo a la pagina principal...")); 
        }else{
            echo json_encode(array("error"=> "El usuario no se ha podio borrar"));
        }
    }
}
?>