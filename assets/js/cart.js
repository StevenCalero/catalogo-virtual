document.addEventListener('DOMContentLoaded', () => {
    cargarCarrito();
    actualizarCarritoCount();
});

function cargarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoItems = document.getElementById('carrito-items');
    let total = 0;

    fetch('data/productos.json')
        .then(response => response.json())
        .then(productos => {
            carrito.forEach(item => {
                const producto = productos.find(p => p.id === item.id);
                if (producto) {
                    const div = document.createElement('div');
                    div.className = 'producto';
                    div.innerHTML = `
                        <h3>${producto.nombre}</h3>
                        <p>Precio: $${producto.precio}</p>
                        <button onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
                    `;
                    carritoItems.appendChild(div);
                    total += producto.precio;
                }
            });
            document.getElementById('total-price').textContent = total;
        });
}

function eliminarDelCarrito(id) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito = carrito.filter(item => item.id !== id);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    cargarCarrito();
    actualizarCarritoCount();
}

function finalizarCompra() {
    const nombreCliente = prompt("Ingrese su nombre:");
    const telefonoCliente = prompt("Ingrese su número de WhatsApp:");
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let mensaje = `*Nuevo Pedido*\n\n`;

    fetch('data/productos.json')
        .then(response => response.json())
        .then(productos => {
            carrito.forEach(item => {
                const producto = productos.find(p => p.id === item.id);
                if (producto) {
                    mensaje += `- ${producto.nombre}: $${producto.precio}\n`;
                }
            });

            mensaje += `\n*Cliente:* ${nombreCliente}\n*Teléfono:* ${telefonoCliente}`;
            window.open(`https://wa.me/+TU_NUMERO_WHATSAPP?text=${encodeURIComponent(mensaje)}`);
        });
}

function actualizarCarritoCount() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    document.getElementById('cart-count').textContent = carrito.length;
}