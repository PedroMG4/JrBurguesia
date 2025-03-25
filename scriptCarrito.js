document.addEventListener('DOMContentLoaded', () => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const contenedor = document.getElementById('carrito-productos');

    contenedor.innerHTML = ''; // Limpiar contenido previo

    let total = 0;

    carrito.forEach((item, index) => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;

        const article = document.createElement('article');
        article.classList.add('item-carrito');
        article.innerHTML = `
            <div class="info-producto">
                <h3>${item.nombre}</h3>
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
});
