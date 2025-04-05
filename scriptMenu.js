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
  
    // Verificar si el producto tiene variantes (hamburguesas)
    const tieneVariantes = contenedor.querySelector('input[type="radio"]');
    let variante = "Única";
  
    if (tieneVariantes) {
      const varianteSeleccionada = contenedor.querySelector('input[type="radio"]:checked');
      if (!varianteSeleccionada) {
        mostrarModalError("Por favor, seleccioná una variante: Simple, Doble o Triple.");
        return;
      }
      
      variante = varianteSeleccionada.parentElement.textContent.trim();
    }
  
    const precios = {
      'Cheeseburger': { 'Simple': 2500, 'Doble': 3000, 'Triple': 3500 },
      'Mega':         { 'Simple': 2800, 'Doble': 3300, 'Triple': 3800 },
      'Clásica':      { 'Simple': 2700, 'Doble': 3200, 'Triple': 3700 },
      'Super':        { 'Simple': 3000, 'Doble': 3500, 'Triple': 4000 },
      'BBQ':          { 'Simple': 2900, 'Doble': 3400, 'Triple': 3900 },
      'Lomito': 3500,
      'Milanesa': 2800,
      'Milanesa Napolitana': 3100,
      'Sandwich de Milanesa': 3000,
      'Papas simples': 1600,
      'Papas con cheddar y bacon': 1800,
      'Cheeseburguesa Clásica': 2500,
      'Papas con Cheddar': 1800
    };
  
    let precioUnitario = 2500;
  
    if (precios[producto]) {
      if (typeof precios[producto] === 'object') {
        precioUnitario = precios[producto][variante] || 2500;
      } else {
        precioUnitario = precios[producto];
      }
    }
  
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  
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
  
    localStorage.setItem('carrito', JSON.stringify(carrito));
  
    actualizarCarritoCantidad();
  
    mostrarModalConfirmacion(`Agregaste ${cantidad} "${producto} (${variante})" al carrito.`);

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
// modal para la confirmacion de la seleccion de un producto
function mostrarModalConfirmacion(mensaje) {
  const modal = document.getElementById('modalConfirmacion');
  const mensajeElem = document.getElementById('mensajeConfirmacion');

  mensajeElem.textContent = mensaje;
  modal.style.display = 'flex';
  setTimeout(() => modal.classList.add('active'), 10); // delay para que se active la animación
}

function cerrarModalConfirmacion() {
  const modal = document.getElementById('modalConfirmacion');
  modal.classList.remove('active');
  setTimeout(() => {
    modal.style.display = 'none';
  }, 300); // esperar a que termine la animación
}

// Cierre al hacer clic fuera del contenido
window.addEventListener('click', function (event) {
  const modal = document.getElementById('modalConfirmacion');
  if (event.target === modal) {
    cerrarModalConfirmacion();
  }
});


// modal para avisar que no se selecciono variante (simple, doble o triple)
function mostrarModalError(mensaje) {
  const modal = document.getElementById('modalError');
  const mensajeElem = document.getElementById('mensajeError');

  mensajeElem.textContent = mensaje;
  modal.style.display = 'flex';
  setTimeout(() => modal.classList.add('active'), 10);
}

function cerrarModalError() {
  const modal = document.getElementById('modalError');
  modal.classList.remove('active');
  setTimeout(() => {
    modal.style.display = 'none';
  }, 300);
}

// Cierre al hacer clic fuera del modal
window.addEventListener('click', function (event) {
  const modal = document.getElementById('modalError');
  if (event.target === modal) {
    cerrarModalError();
  }
});

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
