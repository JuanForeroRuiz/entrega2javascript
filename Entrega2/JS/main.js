// DEFINIMOS EL NOMBRE DEL USUARIO
let usuarioActual = prompt("Ingresa tu nombre:") || "INVITADO";

document.getElementById("displayUsuario").innerText = ` ${usuarioActual.toUpperCase()}`;

// CLAVE PARA LOCALSTORAGE
const CLAVE_DB = "productos";

//ARRAY PRINCIPAL
let items = [];

// --- FUNCIONES ---
function recuperarDatos() {
    let archivo = localStorage.getItem(CLAVE_DB);
    if (archivo) {
        items = JSON.parse(archivo);
    }
}

function persistirDatos() {
    localStorage.setItem(CLAVE_DB, JSON.stringify(items));
}

function refrescarVista() {
    let panelLista = document.getElementById("contenedorInventario");
    panelLista.innerHTML = "";

    items.forEach(function(item) {
        let fila = document.createElement("li");
        fila.className = "mb-3";
        fila.innerHTML = `
            ${item.nombre.toUpperCase()} - $${item.valor}
            <button onclick="borrarItem('${item.codigo}')" class="btn btn-danger ms-4">Eliminar</button>
        `;
        panelLista.appendChild(fila);
    });

    sumarTotal();
}

function registrarItem() {
    let campoNombre = document.getElementById("inputArticulo");
    let campoValor = document.getElementById("inputValor");

    let nuevoItem = {
        codigo: Date.now(), 
        nombre: campoNombre.value,
        valor: parseFloat(campoValor.value)
    };

    items.push(nuevoItem);
    persistirDatos();
    refrescarVista();

    campoNombre.value = "";
    campoValor.value = "";
}

function borrarItem(id) {
    items = items.filter(function(elemento) {
        return elemento.codigo != id;
    });
    persistirDatos();
    refrescarVista();
}

function organizarPorCosto() {
    items.sort(function(a, b) {
        return a.valor - b.valor;
    });
    persistirDatos();
    refrescarVista();
}

function sumarTotal() {
    let acumulado = 0;
    items.forEach(function(item) {
        acumulado += item.valor;
    });
    document.getElementById("displayTotal").innerText = acumulado;
}

document.getElementById("btnRegistrar").addEventListener("click", registrarItem);