function openModal(element) {
    const modal = document.getElementById("infoModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalDescription = document.getElementById("modalDescription");

    // Obtener datos desde atributos personalizados
    const title = element.getAttribute("data-title");
    const description = element.getAttribute("data-description");

    // Insertar datos en el modal
    modalTitle.textContent = title;
    modalDescription.textContent = description;

    // Aplicar estilos personalizados si querés
    modalTitle.classList.add("modal-title-estilo");
    modalDescription.classList.add("modal-description-estilo");

    // Mostrar el modal
    modal.classList.add("active"); // Hace visible y centra el modal
    setTimeout(() => {
        modal.classList.add("show"); // Para animación si usás .show
    }, 10);
}
function addToCart(buttonElement) {
    const contenedor = buttonElement.closest('.hamburguesa-item');
    const cantidadInput = contenedor.querySelector('.cantidad-input');
    const cantidad = parseInt(cantidadInput.value) || 1;

    const imagen = contenedor.querySelector('.image-preview');
    const producto = imagen.getAttribute('data-title');

    // Simulación de precios (podés ajustar esto después)
    const precios = {
        'Cheeseburger': 2500,
        'Mega': 3000,
        'Clásica': 2700,
        'Super': 3200,
        'BBQ': 2900,
        'Lomito': 3500,
        'Milanesa': 2800,
        'Milanesa Napolitana': 3100,
        'Sandwich de Milanesa': 3000,
        'Papas simples': 1600,
        'Papas con cheddar y bacon': 1800,
        'Cheeseburguesa Clásica': 2500,
        'Papas con Cheddar': 1800
    };

    const precioUnitario = precios[producto] || 2500;

    // Obtener carrito actual o crear uno nuevo
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Verificar si ya existe y sumar cantidad
    const existente = carrito.find(item => item.nombre === producto);
    if (existente) {
        existente.cantidad += cantidad;
    } else {
        carrito.push({
            nombre: producto,
            cantidad: cantidad,
            precio: precioUnitario
        });
    }

    // Guardar en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    alert(`Agregaste ${cantidad} "${producto}" al carrito.`);
}


function closeModal(event) {
    const modal = document.getElementById("infoModal");

    // Cerrar el modal si se hace clic fuera del contenido o en la X
    if (event.target.classList.contains("modal") || event.target.classList.contains("close")) {
        modal.classList.remove("show");
        setTimeout(() => {
            modal.classList.remove("active"); // Oculta el modal
        }, 100);
    }
}
