function actualizarCarritoCantidad() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const totalCantidad = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    const badge = document.getElementById('carrito-cantidad');
    if (badge) {
      badge.textContent = totalCantidad;
      badge.style.display = totalCantidad > 0 ? 'inline-block' : 'none';
    }
  }
  
  function mostrarResumenCarrito() {
    const resumen = document.getElementById('resumen-carrito');
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  
    if (carrito.length === 0) {
      resumen.innerHTML = '<p>El carrito está vacío.</p>';
      return;
    }
  
    let total = 0;
    resumen.innerHTML = '<h2>Resumen del Pedido</h2>';
  
    carrito.forEach(item => {
      const subtotal = item.precio * item.cantidad;
      total += subtotal;
  
      const div = document.createElement('div');
      div.classList.add('item-resumen');
      div.innerHTML = `
        <p><strong>${item.nombre}${item.variante !== 'Simple' ? ' (' + item.variante + ')' : ''}</strong></p>
        <p>Cantidad: ${item.cantidad}</p>
        <p>Subtotal: $${subtotal}</p>
        <hr>
      `;
      resumen.appendChild(div);
    });
  
    const totalP = document.createElement('p');
    totalP.innerHTML = `<strong>Total a pagar: $${total}</strong>`;
    resumen.appendChild(totalP);
  }
  
  // Confirmar compra
  document.addEventListener('DOMContentLoaded', () => {
    actualizarCarritoCantidad();
    mostrarResumenCarrito();
  
    const form = document.getElementById('formFinalizar');
  
    form.addEventListener('submit', function (e) {
      e.preventDefault();
  
      const nombre = document.getElementById('nombre').value;
      const direccion = document.getElementById('direccion').value;
      const telefono = document.getElementById('telefono').value;
  
      const pedido = {
        cliente: {
          nombre,
          direccion,
          telefono
        },
        carrito: JSON.parse(localStorage.getItem('carrito')) || [],
        fecha: new Date().toISOString()
      };
  
      // Guardar en historial
      let historial = JSON.parse(localStorage.getItem('historialPedidos')) || [];
      historial.push(pedido);
      localStorage.setItem('historialPedidos', JSON.stringify(historial));
  
      // Vaciar carrito
      localStorage.removeItem('carrito');
  
      // Mostrar mensaje de éxito
      document.querySelector('.formulario-cliente').style.display = 'none';
      document.getElementById('resumen-carrito').style.display = 'none';
      document.getElementById('mensaje-exito').style.display = 'block';
  
      actualizarCarritoCantidad();
    });
  });
  