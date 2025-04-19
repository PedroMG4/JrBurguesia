// index.js

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT =  process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/enviar-pedido', (req, res) => {
  const { nombre, direccion, telefono, correo, observaciones, pedido } = req.body;

  const pedidoId = 'PED-' + Date.now();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'jrburguesia.ctes@gmail.com',
      pass: process.env.GMAIL_APP_PASS // Reemplazar por contraseña de aplicación real
    }
  });

  const mailOptions = {
    from: 'jrburguesia.ctes@gmail.com',
    to: correo,
    subject: `Pedido recibido - JrBurguesía (#${pedidoId})`,
    text: `
Hola ${nombre}!

Gracias por tu pedido. Este es tu número de pedido: #${pedidoId}

Estos son los detalles:

Dirección: ${direccion}
Teléfono: ${telefono}
Correo: ${correo}

Pedido:
${pedido}

Observaciones:
${observaciones || 'Ninguna'}

Nos vamos a contactar para avisarte alguna novedad.

JrBurguesía
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el email:', error);
      return res.status(500).send('Error al enviar el pedido.');
    } else {
      console.log('Email enviado:', info.response);
      return res.status(200).send({ mensaje: 'Pedido enviado con éxito.', pedidoId });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
