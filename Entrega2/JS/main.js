// DEFINIMOS EL NOMBRE DEL USUARIO
let nombrePersona = prompt("Ingresa tu nombre:") || "Invitado";

document.getElementById("nombreIngresado").innerText = ` ${nombrePersona.toUpperCase()}`;

// CLAVE PARA LOCALSTORAGE
const STORAGE_KEY = "productos";

// ARRAY PRINCIPAL
let productos = [];

// --- FUNCIONES ---

function cargarProductos() {
    let datosGuardados = localStorage.getItem(STORAGE_KEY);
    if (datosGuardados) {
        productos = JSON.parse(datosGuardados);
    }
}

function guardarProductos() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(productos));
}

function mostrarProductos() {
    let lista = document.getElementById("listaProductos");
    lista.innerHTML = "";

    
    productos.forEach(function(producto) {
        let li = document.createElement("li");
        li.className = "mb-3";
        li.innerHTML = `
            ${producto.nombre.toUpperCase()} - $${producto.precio}
            <button onclick="eliminarProducto('${producto.id}')" class="btn btn-danger ms-4">Eliminar</button>
        `;
        lista.appendChild(li);
    });

    calcularTotal();
}

function agregarProducto() {
    let nombreInput = document.getElementById("nombreProducto");
    let precioInput = document.getElementById("precioProducto");

    let nombreMayusculas = nombreInput.value.toUpperCase();

   
    let nuevoProducto = {
        id: Date.now(), 
        nombre: nombreInput.value.toUpperCase(),
        precio: parseFloat(precioInput.value)
    };

    productos.push(nuevoProducto);
    guardarProductos();
    mostrarProductos();

   
    nombreInput.value = "";
    precioInput.value = "";
}

function eliminarProducto(id) {
    
    productos = productos.filter(function(producto) {
        return producto.id != id;
    });

    guardarProductos();
    mostrarProductos();
}

function ordenarPorPrecio() {
    
    productos.sort(function(a, b) {
        
        let precioA = parseFloat(a.precio);
        let precioB = parseFloat(b.precio);
        
        
        return precioA - precioB;
    });

    
    guardarProductos();
    mostrarProductos();
}

function calcularTotal() {
    let total = 0;
    
    productos.forEach(function(producto) {
        total += producto.precio;
    });
    
    document.getElementById("totalCarrito").innerText = total;
}


document.getElementById("agregarProducto").addEventListener("click", agregarProducto);