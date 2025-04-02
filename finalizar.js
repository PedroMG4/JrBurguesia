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
      <div class="descripcion-item-resumen">
        <p class="cantidad-descripcion-item-resumen">Cantidad: ${item.cantidad}</p>
        <p class="subtotal-descripcion-item-resumen">Subtotal: $${subtotal}</p>
      </div>
      <hr>
    `;
    resumen.appendChild(div);
  });

  const totalP = document.createElement('p');
  totalP.innerHTML = `<strong>Total a pagar: $ ${total}</strong>`;
  totalP.style.fontSize = '30px';
  resumen.appendChild(totalP);
}

// Confirmar compra
document.addEventListener('DOMContentLoaded', () => {
  actualizarCarritoCantidad();
  mostrarResumenCarrito();

  const form = document.getElementById('formFinalizar');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const direccion = document.getElementById('direccion').value;
    const telefono = document.getElementById('telefono').value;
    const correo = document.getElementById('correo').value;
    const observaciones = document.getElementById('observaciones').value;

    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const pedido = carrito.map(item => {
      return `- ${item.nombre}${item.variante !== 'Simple' ? ' (' + item.variante + ')' : ''} x${item.cantidad} = $${item.precio * item.cantidad}`;
    }).join('\n');

    try {
      const res = await fetch('http://localhost:3000/enviar-pedido', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, direccion, telefono, correo, observaciones, pedido })
      });

      if (res.ok) {
        const data = await res.json();

        document.querySelector('.formulario-cliente').style.display = 'none';
        document.getElementById('resumen-carrito').style.display = 'none';
        const mensajeExito = document.getElementById('mensaje-exito');
        mensajeExito.innerHTML = `
          <h2>¡Gracias por tu compra!</h2>
          <p>Tu número de pedido es: <strong>${data.pedidoId}</strong></p>
          <p>Te enviamos un correo con los detalles. ¡Revisá tu bandeja de entrada!</p>
        `;
        mensajeExito.style.display = 'block';

        localStorage.removeItem('carrito');
        actualizarCarritoCantidad();
      } else {
        alert('Error al enviar el pedido');
      }
    } catch (err) {
      console.error(err);
      alert('Error de conexión con el servidor');
    }
  });

  const retiroCheckbox = document.getElementById('retiroSucursal');
  const direccionInput = document.getElementById('direccion');

  retiroCheckbox.addEventListener('change', () => {
    if (retiroCheckbox.checked) {
      direccionInput.disabled = true;
      direccionInput.value = 'Retiro por sucursal';
    } else {
      direccionInput.disabled = false;
      direccionInput.value = '';
    }
  });
});