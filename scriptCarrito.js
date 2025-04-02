function actualizarCarritoCantidad() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const totalCantidad = carrito.reduce((sum, item) => sum + item.cantidad, 0);

    const badge = document.getElementById('carrito-cantidad');
    if (badge) {
        badge.textContent = totalCantidad;
        badge.style.display = totalCantidad > 0 ? 'inline-block' : 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    actualizarCarritoCantidad();

    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const contenedor = document.getElementById('carrito-productos');
    contenedor.innerHTML = ''; // Limpiar contenido previo

    if (carrito.length === 0) {
        contenedor.innerHTML = `
            <div class="carrito-vacio">
                <svg viewBox="0 0 32 32" id="svg5" fill="#f2bb13" width="90px" heigth="90px">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier"> <defs id="defs2"></defs>
                                    <g id="layer1" transform="translate(-12,-292)">
                                        <path class="cart" d="m 21,316.00586 c -1.645008,0 -3,1.35499 -3,3 0,1.64501 1.354992,3 3,3 1.645008,0 3,-1.35499 3,-3 0,-1.64501 -1.354992,-3 -3,-3 z m 0,2 c 0.564129,0 1,0.43587 1,1 0,0.56413 -0.435871,1 -1,1 -0.564129,0 -1,-0.43587 -1,-1 0,-0.56413 0.435871,-1 1,-1 z" id="circle5400" style="color:#f2bb13;fill:#f2bb13;fill-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4.1;-inkscape-stroke:none"></path> 
                                        <path class="cart" d="m 35.999999,316.00586 c -1.645008,0 -3,1.35499 -3,3 0,1.64501 1.354992,3 3,3 1.645008,0 3,-1.35499 3,-3 0,-1.64501 -1.354992,-3 -3,-3 z m 0,2 c 0.564129,0 1,0.43587 1,1 0,0.56413 -0.435871,1 -1,1 -0.564129,0 -1,-0.43587 -1,-1 0,-0.56413 0.435871,-1 1,-1 z" id="circle5402" style="color:#f2bb13;fill:#f2bb13;fill-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4.1;-inkscape-stroke:none"></path> 
                                        <path class="cart" d="m 15,294.00586 c -0.552285,0 -1,0.44772 -1,1 0,0.55228 0.447715,1 1,1 h 1.179688 l 2.65039,13.24219 C 17.759297,309.70823 17,310.77542 17,312.00586 c 0,1.6447 1.355301,3 3,3 h 18.011718 c 0.552285,0 1,-0.44772 1,-1 0,-0.55228 -0.447715,-1 -1,-1 H 20 c -0.571296,0 -1,-0.4287 -1,-1 0,-0.5713 0.428704,-1 1,-1 h 16.011718 3 c 0.492161,2.4e-4 0.911339,-0.35764 0.988281,-0.84375 l 1.730469,-11 c 0.09599,-0.60725 -0.373487,-1.15652 -0.988281,-1.15625 H 18.619141 l -0.638672,-3.19531 C 17.887292,294.34287 17.476874,294.00603 17,294.00586 Z m 4.019531,6 h 20.552734 l -1.416016,9 L 20.820312,309 Z m 3.980469,2 c -0.552285,0 -1,0.44772 -1,1 0,0.55228 0.447715,1 1,1 h 13.011718 c 0.552285,0 1,-0.44772 1,-1 0,-0.55228 -0.447715,-1 -1,-1 z m 2,3 c -0.552285,0 -1,0.44772 -1,1 0,0.55228 0.447715,1 1,1 h 9.011718 c 0.552285,0 1,-0.44772 1,-1 0,-0.55228 -0.447715,-1 -1,-1 z" id="path5404" style="color:#f2bb13;fill:#f2bb13;fill-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4.1;-inkscape-stroke:none"></path> 
                                    </g>
                                </g>
                </svg>
                <p>El carrito está vacío.</p>
                <button class="btn-volver">Volver al menú</button>
            </div>
        `;

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
        <h3>Total a pagar: $ ${total}</h3>
        <div class="botones-continuar-finalizar"> 
            <button class="btn-volver">Continuar compra</button>
            <button class="btn-finalizar">Finalizar Compra</button>
        </div>    
    `;
    contenedor.appendChild(totalSection);

    // Eliminar producto
    contenedor.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-eliminar')) {
            const index = e.target.getAttribute('data-index');
            carrito.splice(index, 1);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            location.reload(); // Recargar para actualizar vista
        }
    });

    // Volver al menú
    document.querySelector('.btn-volver').addEventListener('click', () => {
        window.location.href = 'menu.html';
    });

    // Ir a finalizar compra
    document.querySelector('.btn-finalizar').addEventListener('click', () => {
        window.location.href = 'finalizar.html';
    });
});
