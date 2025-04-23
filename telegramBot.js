const axios = require('axios');
const modelData = require('./modelData.json');

const TOKEN = process.env.BOT_TOKEN || '7778728053:AAE3-y_6S9qhApfqO_VeZFgVZr2o6gqbaOs';
const API_URL = `https://api.telegram.org/bot${TOKEN}`;

const handleTelegram = async (req, res) => {
  const message = req.body.message;
  if (!message || !message.text) return res.send('ok');

  const chatId = message.chat.id;
  const text = message.text.toLowerCase();

  if (text.includes('/start') || text.includes('hola')) {
    await axios.post(`${API_URL}/sendMessage`, {
      chat_id: chatId,
      text: `👋 Bienvenido al asistente de ${modelData.name}.

Opciones:
1️⃣ Ver contenido
2️⃣ Saber más
3️⃣ Ir al OnlyFans`,
    });
  } else if (text.includes('ver')) {
    for (const url of modelData.preview_images) {
      await axios.post(`${API_URL}/sendPhoto`, {
        chat_id: chatId,
        photo: url
      });
    }
  } else if (text.includes('saber')) {
    await axios.post(`${API_URL}/sendMessage`, {
      chat_id: chatId,
      text: modelData.bio
    });
  } else if (text.includes('onlyfans')) {
    await axios.post(`${API_URL}/sendMessage`, {
      chat_id: chatId,
      text: `✨ Aquí está su OnlyFans: ${modelData.onlyfans}`
    });
  }

  res.send('ok');
};

module.exports = handleTelegram;
