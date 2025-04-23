const express = require('express');
const bodyParser = require('body-parser');
const handleTelegram = require('./telegramBot');
const app = express();

app.use(bodyParser.json());

app.post('/webhook-telegram', handleTelegram);

app.get('/', (req, res) => {
  res.send('🤖 Bot activo y esperando mensajes');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
