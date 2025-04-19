const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware manual de CORS (funciona seguro en Render)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://jrburguesiafe.onrender.com');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200); // Responde preflight
  }
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta opcional para test
app.get('/', (req, res) => {
  res.send('Servidor JrBurguesía funcionando 🚀');
});

app.post('/enviar-pedido', (req, res) => {
  const { nombre, direccion, telefono, correo, observaciones, pedido } = req.body;
  const pedidoId = 'PED-' + Date.now();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'jrburguesia.ctes@gmail.com',
      pass: process.env.GMAIL_APP_PASS
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
  console.log(`Servidor escuchando en puerto ${PORT}`);
});

