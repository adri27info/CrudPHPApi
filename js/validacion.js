const formulario = document.getElementById("formulario");
const nombre_usuario = formulario.nombre_usuario;
const direccion_usuario = formulario.direccion_usuario;
const telefono_usuario = formulario.telefono_usuario;
const id_usuario = formulario.id_usuario;
const inputs = document.getElementsByTagName("input");
const expresiones = {
  nombre_usuario: /^[a-zA-Z]{3,20}$/,
  direccion_usuario: /^[a-zA-Z0-9_/,.\s]{4,20}$/,
  telefono_usuario: /^[6|7|9]([0-9]{8})$/,
};
const validaciones = {
  nombre_usuario: false,
  direccion_usuario: false,
  telefono_usuario: false,
};
const containerDatos = document.getElementById("containerDatos");
let link = "http://localhost:80/apps/php/CrudPHPApi/recursos/api.php";

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  enviarFormulario(e);
});

async function insertarUsuario() {
  try {
    const res = await fetch(link, {
      method: "POST",
      headers: { "Content-type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        id_usuario: 0,
        nombre_usuario: nombre_usuario.value,
        direccion_usuario: direccion_usuario.value,
        telefono_usuario: telefono_usuario.value,
      }),
    });
    if (res.status === 200) {
      const data = await res.json();
      if (Object.keys(data).includes("exito")) {
        desactivarBoton();
        crearMensaje("ocultar", "green", "done", data.exito);
        setTimeout(() => (window.location.href = "index.html"), 3000);
      } else {
        crearMensaje("ocultar", "red", "warning", data.error);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

async function actualizarUsuario() {
  try {
    const res = await fetch(link, {
      method: "PUT",
      headers: { "Content-type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        id_usuario: id_usuario.value,
        nombre_usuario: nombre_usuario.value,
        direccion_usuario: direccion_usuario.value,
        telefono_usuario: telefono_usuario.value,
      }),
    });
    if (res.status === 200) {
      const data = await res.json();
      if (Object.keys(data).includes("exito")) {
        desactivarBoton();
        crearMensaje("ocultar", "green", "done", data.exito);
        setTimeout(() => (window.location.href = "index.html"), 3000);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

function enviarFormulario(e) {
  let contador = 0;
  for (let key in validaciones) {
    if (validaciones[key] === true) {
      contador++;
    }
  }
  if (contador === 3) {
    if (formulario.classList.contains("insertar")) {
      insertarUsuario();
    } else if (formulario.classList.contains("actualizar")) {
      actualizarUsuario();
    }
  } else {
    let contenedores = document.querySelectorAll("#formulario div");
    contenedores.forEach((element) => {
      let contenedor = element.classList[0];
      for (let iterator in validaciones) {
        if (validaciones[iterator] === false) {
          let cadena = "contenedor" + iterator.replace("_", "").split(" ");
          if (cadena === contenedor.toLocaleLowerCase()) {
            element.classList.remove("ocultar");
          }
        }
      }
    });
  }
}

function asignarEventosInputs() {
  comprobarUrl();
  for (let index = 0; index < inputs.length; index++) {
    if (inputs[index].type === "text") {
      inputs[index].addEventListener("blur", validarFormulario);
      inputs[index].addEventListener("keyup", validarFormulario);
    }
  }
}

function validarFormulario(e) {
  switch (e.target.id) {
    case "nombre_usuario":
      validarCampo(
        nombre_usuario.value,
        expresiones.nombre_usuario,
        "error_usuario",
        "nombre_usuario"
      );
      break;
    case "direccion_usuario":
      validarCampo(
        direccion_usuario.value,
        expresiones.direccion_usuario,
        "error_direccion",
        "direccion_usuario"
      );
      break;
    case "telefono_usuario":
      validarCampo(
        telefono_usuario.value,
        expresiones.telefono_usuario,
        "error_telefono",
        "telefono_usuario"
      );
      break;
    default:
      break;
  }
}

function validarCampo(valor, expresion, textoSpan, nombre) {
  let contenedorSpan = document.getElementById(textoSpan).parentNode;
  if (!expresion.test(valor)) {
    contenedorSpan.classList.remove("ocultar");
    validaciones[nombre] = false;
  } else {
    contenedorSpan.classList.add("ocultar");
    validaciones[nombre] = true;
  }
}

function crearMensaje(clase, color, imgSpan, mensajeSpan) {
  containerDatos.classList.remove(clase);
  containerDatos.style.color = color;
  containerDatos.childNodes[1].textContent = imgSpan;
  containerDatos.childNodes[3].textContent = mensajeSpan;
}

function comprobarUrl() {
  let location = window.location.href;
  if (location.includes("actualizar")) {
    for (let iterator in validaciones) {
      if (validaciones[iterator] === false) {
        validaciones[iterator] = true;
      }
    }
  } else {
    return;
  }
}

function desactivarBoton() {
  document.getElementById("btnEnviar").disabled = true;
  document.getElementById("btnEnviar").classList.add("desactivar");
}

asignarEventosInputs();
