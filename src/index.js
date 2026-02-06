const express = require('express');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Cliente WhatsApp
const client = new Client({
  authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
  console.log('=== QR CODE ===');
  qrcode.generate(qr, { small: true });
  console.log('Escanea este QR con WhatsApp');
});

client.on('ready', () => {
  console.log('✅ Bot de Dental Santa Isabel listo!');
});

client.on('message', async (msg) => {
  const texto = msg.body.toLowerCase();
  
  // Saludo
  if (texto.includes('hola') || texto === 'hi') {
    await msg.reply('¡Hola! Bienvenido a Dental Santa Isabel 🦷\n\n¿En qué puedo ayudarte?\n1. Agendar cita\n2. Consultar citas\n3. Horarios');
  }
  
  // Agendar cita
  else if (texto.includes('agendar') || texto === '1') {
    await msg.reply('Para agendar tu cita, envíame:\nFecha (ej: mañana, 15/02/2026)\nHora (ej: 10am, 15:00)\nServicio (ej: limpieza, extracción)');
  }
  
  // Horarios
  else if (texto.includes('horario') || texto === '3') {
    await msg.reply('🕒 Horario de atención:\nLunes a Viernes: 9:00am - 7:00pm\nSábados: 9:00am - 2:00pm\nDomingos: Cerrado');
  }
});

client.initialize();

// Servidor Express
app.get('/', (req, res) => {
  res.json({ 
    status: 'online', 
    bot: 'Dental Santa Isabel WhatsApp Bot',
    timestamp: new Date()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor en puerto ${PORT}`);
});
