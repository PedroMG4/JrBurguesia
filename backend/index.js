const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de CORS con soporte para preflight
app.use(cors({
  origin: 'https://jrburguesiafe.onrender.com',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

// Manejar preflight (solicitudes OPTIONS)
app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta principal opcional (para evitar "Cannot GET /")
app.get('/', (req, res) => {
  res.send('Servidor JrBurguesía funcionando correctamente 🚀');
});

app.post('/enviar-pedido', (req, res) => {
  const { nombre, direccion, telefono, correo, observaciones, pedido } = req.body;

  const pedidoId = 'PED-' + Date.now();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'jrburguesia.ctes@gmail.com',
      pass: process.env.GMAIL_APP_PASS // Usar variable de entorno segura
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
