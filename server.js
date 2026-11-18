const http = require("http");
const VERIFY_TOKEN = process.env.VERIFY_TOKEN || "GOLDEN_NINJA_123";
const PORT = process.env.PORT || 3000;
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;
const GEMINI_KEY = process.env.GEMINI_KEY;
const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    const url = new URL(req.url, "http://localhost");
    if (url.searchParams.get("hub.verify_token") === VERIFY_TOKEN) {
      res.end(url.searchParams.get("hub.challenge"));
      return;
    }
    res.end("SPENIX GOLD BOT IS LIVE");
    return;
  }
  let body = "";
  req.on("data", c => body += c);
  req.on("end", () => { res.end("OK"); console.log(body); });
});
server.listen(PORT, () => console.log("Running on " + PORT));
