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

    // Obtener variante seleccionada
    const varianteSeleccionada = contenedor.querySelector('input[type="radio"]:checked');
    const variante = varianteSeleccionada
        ? varianteSeleccionada.parentElement.textContent.trim()
        : "Simple";

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

    // Verificar si ya existe mismo producto con misma variante
    const existente = carrito.find(item => item.nombre === producto && item.variante === variante);

    if (existente) {
        existente.cantidad += cantidad;
    } else {
        carrito.push({
            nombre: producto,
            cantidad: cantidad,
            precio: precioUnitario,
            variante: variante
        });
    }

    // Guardar en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));



    // Actualizar el número del carrito en el ícono
    actualizarCarritoCantidad();
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

// Función para actualizar el número del carrito en el header
function actualizarCarritoCantidad() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const totalCantidad = carrito.reduce((sum, item) => sum + item.cantidad, 0);

    const badge = document.getElementById('carrito-cantidad');
    if (badge) {
        badge.textContent = totalCantidad;
        badge.style.display = totalCantidad > 0 ? 'inline-block' : 'none';
    }
}

// Sumar/restar cantidad dinámicamente
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.hamburguesa-item').forEach(item => {
        const btnSumar = item.querySelector('.btn-sumar');
        const btnRestar = item.querySelector('.btn-restar');
        const input = item.querySelector('.cantidad-input');

        btnSumar.addEventListener('click', () => {
            let cantidad = parseInt(input.value) || 1;
            cantidad++;
            input.value = cantidad;
        });

        btnRestar.addEventListener('click', () => {
            let cantidad = parseInt(input.value) || 1;
            if (cantidad > 1) {
                cantidad--;
                input.value = cantidad;
            }
        });
    });

    // Al cargar la página, actualizar el número del carrito
    actualizarCarritoCantidad();
});
