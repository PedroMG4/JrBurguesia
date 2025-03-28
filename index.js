// 1. Importamos las librerías necesarias
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

// 2. Inicializamos el servidor con Express
const app = express();
const PORT = 3000;

// 3. Middlewares para que Express entienda JSON y permita CORS
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4. Ruta que recibe los pedidos desde finalizar.html
app.post('/enviar-pedido', (req, res) => {
  const { nombre, direccion, telefono, pedido } = req.body;

  // 5. Configuramos el transporte de correo
  const transporter = nodemailer.createTransport({
    service: 'gmail', // o cualquier otro (ej: outlook, mailgun)
    auth: {
      user: 'pedrogaray24@gmail.com',       // REEMPLAZÁ ESTO
      pass: 'tu_contraseña_de_aplicacion' // NO tu contraseña real: se genera desde tu Gmail
    }
  });

  // 6. Armamos el contenido del email
  const mailOptions = {
    from: 'pedidos@jrburguesia.com',
    to: 'tudestinatario@gmail.com',
    subject: `Nuevo pedido de ${nombre}`,
    text: `
      Nombre: ${nombre}
      Dirección: ${direccion}
      Teléfono: ${telefono}

      Pedido:
      ${pedido}
    `
  };

  // 7. Enviamos el email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el email:', error);
      return res.status(500).send('Error al enviar el pedido.');
    } else {
      console.log('Email enviado:', info.response);
      return res.status(200).send('Pedido enviado con éxito.');
    }
  });
});

// 8. Levantamos el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
