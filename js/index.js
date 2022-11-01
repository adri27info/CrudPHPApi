const tbody = document.getElementById("cuerpoTabla");
const modal = document.getElementById("modal");
const btnCerrarModal = document.getElementById("btnCerrarModal");
const btnCancelar = document.getElementById("btnCancelar");
const btnEliminar = document.getElementById("btnEliminar");
const containerDatos = document.getElementById("containerDatos");
let url = "recursos/api.php";
let spanMensajeBorrar = document.getElementById("spanMensajeBorrar");

btnCerrarModal.addEventListener("click", cerrarModal);
btnCancelar.addEventListener("click", cerrarModal);
btnEliminar.addEventListener("click", eliminarUsuario);

async function eliminarUsuario() {
  let array = spanMensajeBorrar.textContent.split(" ");
  let id = parseInt(array[array.length - 1].replace("?", ""));
  try {
    const res = await fetch(url, {
      method: "DELETE",
      headers: { "Content-type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        id_usuario: id,
      }),
    });
    if (res.status === 200) {
      const data = await res.json();
      if (Object.keys(data).includes("exito")) {
        desactivarBotones();
        crearMensajeBorrado("ocultar", "green", "done", data.exito);
        setTimeout(() => redirigir(), 3000);
      } else {
        desactivarBotones();
        crearMensajeBorrado("ocultar", "red", "warning", data.error);
        setTimeout(() => redirigir(), 3000);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

async function cargarUsuarios() {
  try {
    const res = await fetch(url, {
      method: "GET",
    });
    if (res.status === 200) {
      const data = await res.json();
      if (Object.keys(data).includes("exito")) {
        crearUsuarios(data.exito);
      } else {
        crearUsuarios(null, data.error);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

function crearUsuarios(array, obj) {
  if (array !== null) {
    array.forEach((element) => {
      tbody.innerHTML += `
      <tr>
        <td> ${element.id} </td>
        <td> ${element.nombre} </td>
        <td> ${element.direccion} </td>
        <td> ${element.telefono} </td>
        <td class='casilla_acciones'> 
          <a class='enlace_editar' href='actualizar.php?id=${element.id}&nombre=${element.nombre}&direccion=${element.direccion}&telefono=${element.telefono}'>
            <span class="material-symbols-outlined"> edit </span>
          </a>
          <a class='enlace_borrar'>
            <span class="material-symbols-outlined" id='${element.id}' onclick='abrirModal(this)'> delete </span>
          </a>  
        </td>
      </tr>
      `;
    });
  } else {
    tbody.innerHTML = `<tr> <td cold colspan='5'> ${obj} </td> </tr>`;
  }
}

function crearMensajeBorrado(clase, color, imgSpan, mensajeSpan) {
  containerDatos.classList.remove(clase);
  containerDatos.style.color = color;
  containerDatos.childNodes[1].textContent = imgSpan;
  containerDatos.childNodes[3].textContent = mensajeSpan;
}

function abrirModal(e) {
  spanMensajeBorrar.textContent =
    "¿Estas seguro de que deseas eliminar al usuario con id: " + e.id + "?";
  modal.classList.add("modal-open");
}

function cerrarModal() {
  modal.classList.remove("modal-open");
}

function redirigir() {
  window.location.href = "index.html";
}

function desactivarBotones() {
  btnCerrarModal.style.pointerEvents = "none";
  btnCancelar.disabled = true;
  btnEliminar.disabled = true;
}

cargarUsuarios();
