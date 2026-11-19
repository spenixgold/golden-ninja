const { default: makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys');
const pino = require('pino');
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise(res => rl.question(q, res));

async function start() {
  const { state, saveCreds } = await useMultiFileAuthState('session');
  const { version } = await fetchLatestBaileysVersion();
  const sock = makeWASocket({
    version,
    logger: pino({ level: 'silent' }),
    auth: state,
    printQRInTerminal: false,
    browser: ["Ubuntu", "Chrome", "20.0.04"],
    syncFullHistory: false,
    markOnlineOnConnect: true,
    keepAliveIntervalMs: 10000
  });
  sock.ev.on('creds.update', saveCreds);

  // WAIT 10s - NOT 3s - Pop 20 is slow
  console.log("Connecting to WhatsApp... wait 10s, don't type yet...");
  await new Promise(r => setTimeout(r, 10000));

  if (!sock.authState.creds.registered) {
    const phone = process.env.BOT_NUMBER || await ask("Enter BOT number: ");
    try {
      console.log("Requesting code...");
      const code = await sock.requestPairingCode(phone.trim());
      console.log("\n\n=================================");
      console.log("YOUR PAIRING CODE IS:", code);
      console.log("=================================\n");
      console.log("Go to WhatsApp > Linked Devices > Link with phone number > paste it FAST");
    } catch(e) {
      console.log("Failed:", e.message);
      console.log("Wait 10s, then type node index.js again - don't spam");
      process.exit(0);
    }
  }

  sock.ev.on('connection.update', async (u) => {
    const { connection, lastDisconnect } = u;
    console.log("Connection:", connection);
    if (connection === 'close') {
      const code = lastDisconnect?.error?.output?.statusCode;
      console.log("Reason Code:", code);
      if (code === 401) {
        console.log("401 = session dead. Run: rm -rf session && node index.js");
        process.exit(0);
      }
      if (code !== 401) {
        console.log("Reconnecting in 10s...");
        setTimeout(() => start(), 10000);
      }
    }
    if (connection === 'open') console.log("✅ GOLDEN NINJA IS ONLINE!");
  });

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message) return;
    if (Date.now() - msg.messageTimestamp * 1000 > 10000) return;
    const from = msg.key.remoteJid;
    const text = msg.message.conversation || msg.message.extendedTextMessage?.text || msg.message.imageMessage?.caption || "";
    if (!text) return;
    if (text.includes("Pong! GOLDEN NINJA") || text.includes("GOLDEN NINJA MENU")) return;
    console.log("GOT:", from, "TEXT:", text);
    if (!text.startsWith(".")) return;
    const cmd = text.slice(1).trim().split(' ')[0].toLowerCase();
    const args = text.slice(1).trim().split(' ').slice(1).join(' ');
    if (cmd === 'ping') await sock.sendMessage(from, { text: "🥷 Pong! GOLDEN NINJA is Fast!" }, { quoted: msg });
    if (cmd === 'menu') await sock.sendMessage(from, { text: "🥷 GOLDEN NINJA MENU\n\n.ping - Check speed\n.menu - This menu\n.ninja - Ninja mode\n.alive - Am I alive?\n.owner - Owner\n.say <text> - Bot says it" }, { quoted: msg });
    if (cmd === 'ninja') await sock.sendMessage(from, { text: "🥷 NINJA MODE ON! 🔥" }, { quoted: msg });
    if (cmd === 'alive') await sock.sendMessage(from, { text: "✅ GOLDEN NINJA IS ALIVE!" }, { quoted: msg });
    if (cmd === 'owner') await sock.sendMessage(from, { text: "👑 OWNER: SPENIX GOLD" }, { quoted: msg });
    if (cmd === 'say') await sock.sendMessage(from, { text: args || "Say what? .say hello" }, { quoted: msg });
  });
}
start();
