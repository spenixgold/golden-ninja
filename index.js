const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const pino = require('pino');

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState('session');
  const sock = makeWASocket({
    auth: state,
    logger: pino({ level: 'silent' }),
    printQRInTerminal: false,
    browser: ['Golden Ninja', 'Chrome', '1.0']
  });

  if (!sock.authState.creds.registered) {
    const phoneNumber = 254102515955;
    setTimeout(async () => {
      let code = await sock.requestPairingCode(phoneNumber);
      console.log("YOUR PAIRING CODE: " + code);
    }, 3000);
  }

  sock.ev.on('creds.update', saveCreds);
  sock.ev.on('connection.update', (u) => {
    if (u.connection === 'open') console.log("✅ GOLDEN NINJA ONLINE!");
    if (u.connection === 'close') startBot();
  });

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message || msg.key.fromMe) return;
    const text = msg.message.conversation || msg.message.extendedTextMessage?.text || "";
    const from = msg.key.remoteJid;
    const reply = (t) => sock.sendMessage(from, { text: t }, { quoted: msg });

    if (text === '.menu') reply(`🥷 *GOLDEN NINJA MENU*\n\n.menu - Menu\n.ping - Speed\n.founder - Founder\n.gold - Plans`);
    if (text === '.ping') reply(`Pong! ⚡ Ninja is fast!`);
    if (text === '.founder') reply(`👑 Founder: Jonathan Spen John, Spenix Gold Technologies`);
    if (text === '.gold') reply(`💛 GOLD - 200 KES / $2 /mo\nPLATINUM - 500 KES / $5 /mo`);
  });
}
startBot();
