document.addEventListener('DOMContentLoaded', () => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const contenedor = document.getElementById('carrito-productos');

    contenedor.innerHTML = ''; // Limpiar contenido previo

    if (carrito.length === 0) {
        contenedor.innerHTML = `
            <div class="carrito-vacio">
                <p>El carrito está vacío.</p>
                <button class="btn-volver">Volver al menú</button>
            </div>
        `;

        // Botón para volver al menú si el carrito está vacío
        const btnVolver = document.querySelector('.btn-volver');
        btnVolver.addEventListener('click', () => {
            window.location.href = 'menu.html';
        });

        return;
    }

    let total = 0;

    carrito.forEach((item, index) => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;

        const article = document.createElement('article');
        article.classList.add('item-carrito');
        article.innerHTML = `
            <div class="info-producto">
                <h3>${item.nombre}${item.variante !== "Simple" ? ` (${item.variante})` : ''}</h3>
                <p>Cantidad: ${item.cantidad}</p>
                <p>Precio unitario: $${item.precio}</p>
                <p>Total: $${subtotal}</p>
            </div>
            <button class="btn-eliminar" data-index="${index}">Eliminar</button>
        `;

        contenedor.appendChild(article);
    });

    const totalSection = document.createElement('section');
    totalSection.classList.add('total-carrito');
    totalSection.innerHTML = `
        <h3>Total a pagar: $${total}</h3>
        <button class="btn-volver">Continuar comprando</button>
        <button class="btn-finalizar">Finalizar Compra</button>
    `;
    contenedor.appendChild(totalSection);

    // Funcionalidad eliminar
    contenedor.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-eliminar')) {
            const index = e.target.getAttribute('data-index');
            carrito.splice(index, 1);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            location.reload(); // Recargar para actualizar vista
        }
    });

    // Redirigir al menú desde el botón "Continuar comprando"
    const btnVolver = document.querySelector('.btn-volver');
    btnVolver.addEventListener('click', () => {
        window.location.href = 'menu.html';
    });

    // Redirigir al finalizar compra
    const btnFinalizar = document.querySelector('.btn-finalizar');
    btnFinalizar.addEventListener('click', () => {
        window.location.href = 'finalizar.html';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const totalCantidad = carrito.reduce((sum, item) => sum + item.cantidad, 0);

    const badge = document.getElementById('carrito-cantidad');
    if (badge) {
        badge.textContent = totalCantidad;
        badge.style.display = totalCantidad > 0 ? 'inline-block' : 'none';
    }
});
