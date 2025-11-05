document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
    actualizarCarritoCount();
});

function cargarProductos() {
    fetch('data/productos.json')
        .then(response => response.json())
        .then(productos => {
            const catalogo = document.getElementById('catalogo');
            productos.forEach(producto => {
                const div = document.createElement('div');
                div.className = 'producto';
                div.innerHTML = `
                    <h3>${producto.nombre}</h3>
                    <p>Precio: $${producto.precio}</p>
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                    <button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
                `;
                catalogo.appendChild(div);
            });
        });
}

function agregarAlCarrito(id) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.push({ id, cantidad: 1 });
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarritoCount();
    alert("Producto agregado al carrito!");
}

function actualizarCarritoCount() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    document.getElementById('cart-count').textContent = carrito.length;
}