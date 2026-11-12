const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const VERIFY_TOKEN = process.env.VERIFY_TOKEN || "golden123";
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;

app.get('/', (req, res) => {
  res.send('Golden Ninja is ONLINE 🥷');
});

// Meta will check this
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];
  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }
  return res.sendStatus(403);
});

// Messages come here
app.post('/webhook', async (req, res) => {
  try {
    const entry = req.body.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;
    const msg = value?.messages?.[0];
    if (!msg) return res.sendStatus(200);

    const from = msg.from;
    const text = msg.text?.body?.toLowerCase() || "";
    let reply = "";

    if (text.includes("hi") || text.includes("hello") || text.includes("hey")) {
      reply = "Yo! Golden Ninja here 🥷🔥\n\nType *menu* to see what I can do.";
    } else if (text.includes("menu")) {
      reply = "🥷 GOLDEN NINJA MENU 🥷\n\n1. Type *hi* - Say hello\n2. Type *price* - See prices\n3. Type *help* - Get help";
    } else if (text.includes("price")) {
      reply = "Our prices coming soon bro 💰\nTell me what you want to sell!";
    } else if (text.includes("help")) {
      reply = "I got you bro! What do you need help with?";
    } else {
      reply = "Got it bro 🥷 Type *menu* to see options.";
    }

    await axios.post(
      `https://graph.facebook.com/v21.0/${PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to: from,
        text: { body: reply }
      },
      { headers: { Authorization: `Bearer ${WHATSAPP_TOKEN}` } }
    );

    res.sendStatus(200);
  } catch (e) {
    console.log(e.response?.data || e.message);
    res.sendStatus(200);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Running on " + PORT));
