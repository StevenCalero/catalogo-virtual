document.addEventListener('DOMContentLoaded', () => {
    // Verificar contraseña (simplificado, en producción usa HTTP Basic Auth)
    const contrasenaCorrecta = "admin123";
    const contrasenaIngresada = prompt("Ingrese la contraseña de administrador:");

    if (contrasenaIngresada !== contrasenaCorrecta) {
        alert("Contraseña incorrecta. Redirigiendo...");
        window.location.href = "../index.html";
    } else {
        cargarProductosAdmin();
        document.getElementById('add-product-form').addEventListener('submit', agregarProducto);
    }
});

function cargarProductosAdmin() {
    fetch('../data/productos.json')
        .then(response => response.json())
        .then(productos => {
            const productList = document.getElementById('product-list');
            productos.forEach(producto => {
                const div = document.createElement('div');
                div.className = 'producto';
                div.innerHTML = `
                    <h3>${producto.nombre}</h3>
                    <p>Precio: $${producto.precio}</p>
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                    <button onclick="eliminarProducto(${producto.id})">Eliminar</button>
                `;
                productList.appendChild(div);
            });
        });
}

function agregarProducto(e) {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const precio = document.getElementById('precio').value;
    const imagen = document.getElementById('imagen').value;

    fetch('../data/productos.json')
        .then(response => response.json())
        .then(productos => {
            const nuevoId = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1;
            const nuevoProducto = { id: nuevoId, nombre, precio: parseInt(precio), imagen };
            productos.push(nuevoProducto);

            // En producción, deberías actualizar el JSON en el servidor (aquí solo simulamos)
            alert("Producto agregado (en producción, guardaría en base de datos)");
            location.reload();
        });
}

function eliminarProducto(id) {
    if (confirm("¿Estás seguro de eliminar este producto?")) {
        fetch('../data/productos.json')
            .then(response => response.json())
            .then(productos => {
                const nuevosProductos = productos.filter(p => p.id !== id);
                // En producción, deberías actualizar el JSON en el servidor (aquí solo simulamos)
                alert("Producto eliminado (en producción, actualizaría base de datos)");
                location.reload();
            });
    }
}