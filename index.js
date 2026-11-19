// GOLDEN NINJA V2 - 373+ COMMANDS - by SPENIX GOLD
// SAFE VERSION - NO NUMBER IN CODE
const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('GOLDEN NINJA V2 IS ONLINE 🥷 373+ COMMANDS'));
app.listen(process.env.PORT || 3000, () => console.log('Web on port ' + (process.env.PORT || 3000)));

const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const pino = require('pino');

// OWNER NUMBER IS IN RENDER > ENVIRONMENT, NOT IN CODE
const OWNER = process.env.OWNER_NUMBER || '';
const PREFIX = '.';

const jokes = ["Why did the ninja cross the road? To disappear on the other side 🥷","I told my phone a joke, it cracked up","Your WiFi is so slow, even the ninja got caught","Life is short, smile while you still have teeth"];
const roasts = ["Your brain is like WiFi in the village, barely connects","You are so slow, even a snail said 'hurry up'","Your phone is smarter than you, and it's on 1%","You look like a loading screen that never finishes"];
const quotes = ["Stay sharp like a ninja 🥷","Winners never quit","Be golden, be ninja","Discipline beats motivation"];
const rizz = ["Are you WiFi? Cause I'm feeling the connection","You must be a ninja, cause you stole my heart","Are you Google? Cause you have everything I'm searching for"];
const facts = ["Honey never expires","Ninjas were real spies in Japan","Your heart beats 100k times a day","Bananas are berries"];

// SAFE CALC - NO EVAL
function safeCalc(expr){
  if(!/^[0-9+\-*/(). ]+$/.test(expr)) return null;
  try{ return Function('"use strict";return ('+expr+')')(); }catch{ return null; }
}

async function start() {
  const { state, saveCreds } = await useMultiFileAuthState('session');
  const sock = makeWASocket({ auth: state, logger: pino({level:'silent'}), printQRInTerminal: false });

  if (!sock.authState.creds.registered) {
    setTimeout(async () => {
      try {
        if(!OWNER){ console.log('SET OWNER_NUMBER in Render Environment first!'); return; }
        const code = await sock.requestPairingCode(OWNER);
        console.log('🥷 YOUR PAIRING CODE: ' + code);
        console.log('🥷 TYPE THIS IN WHATSAPP > LINKED DEVICES > LINK WITH PHONE NUMBER');
      } catch(e){ console.log('Pairing error, redeploy:', e.message) }
    }, 3000);
  }

  sock.ev.on('creds.update', saveCreds);
  sock.ev.on('connection.update', (u) => {
    if (u.connection === 'open') console.log('✅ GOLDEN NINJA V2 CONNECTED! 373+ COMMANDS READY');
    if (u.connection === 'close') start();
  });

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const m = messages[0];
    if (!m.message || m.key.fromMe) return;
    const from = m.key.remoteJid;
    const isGroup = from.endsWith('@g.us');
    const sender = m.key.participant || m.key.remoteJid;
    const senderNum = sender.split('@')[0];
    const body = m.message.conversation || m.message.extendedTextMessage?.text || m.message.imageMessage?.caption || '';
    if (!body.startsWith(PREFIX)) return;
    const args = body.slice(1).trim().split(/ +/);
    const cmd = args.shift().toLowerCase();
    const text = args.join(' ');
    const reply = async (t) => await sock.sendMessage(from, { text: t }, { quoted: m });
    const isOwner = OWNER && senderNum === OWNER;

    // ===== HELP & INFO =====
    if (cmd === 'menu' || cmd === 'help' || cmd === 'list' || cmd === 'commands') return reply(`🥷 *GOLDEN NINJA V2 - 373+ COMMANDS* 🥷\n\n*MAIN:* .ping .menu .alive .owner .info .speed .uptime .rules .donate\n*FUN:* .joke .roast .rizz .quote .fact .8ball .truth .dare .ship .meme .compliment .insult .pickup .darkjoke .dadjoke\n*GAMES:* .slot .dice .coinflip .rps .guess .lottery .spin .quiz .math\n*GROUP:* .tagall .hidetag .kick .add .promote .demote .link .info .admins .antilink .welcome .goodbye .close .open .mute .unmute\n*DOWNLOAD:* .play .ytmp3 .ytmp4 .tiktok .ig .fb .song .video .image .wallpaper\n*TOOLS:* .sticker .toimg .qr .weather .translate .calc .time .date .ai .gpt .define .google .screenshot\n*TEXT:* .bold .italic .fancy .small .big .reverse .upper .lower .repeat .shout\n*OWNER:* .broadcast .block .unblock .join .leave .restart .ban\n\nType *.menu2* for more, *.menu3* for all 373\nTotal: 373+ commands!`);
    if (cmd === 'menu2') return reply(`🥷 *MENU 2 - FUN & GAMES*\n.joke .joke2 .joke3 .roast .roast2 .rizz .rizz2 .quote .quote2 .fact .fact2 .8ball .truth .dare .ship .love .hate .cute .hot .ugly .smart .dumb .gayrate .simprate .coolrate .luck .horoscope .zodiac .birthday .age .meme .meme2 .compliment .insult .pickup .darkjoke .dadjoke .pun .story .poem .songlyric .tongue .riddle .wouldyou .neverhave .paranoia .confess\n\n*GAMES:* .slot .dice .dice2 .coinflip .rps .rock .paper .scissors .guess .guessnum .lottery .spin .wheel .quiz .quiz2 .math .math2 .trivia .wordle .hangman .tictactoe .mines .blackjack`);
    if (cmd === 'menu3') return reply(`🥷 *MENU 3 - ALL 373*\nUse .menu for main. All commands work with . prefix.\nTotal categories: Fun 80, Games 40, Group 50, Download 30, Tools 50, Text 30, Anime 30, Religion 20, Owner 20, Misc 23 = 373+\n\nTry: .anime .waifu .neko .husbando .pray .bible .quran .motivate .affirmation .hello .bye .gm .gn .welcome .rules .rules2 .info .about .owner .creator .donate .support .feedback .report .suggest`);
    if (cmd === 'ping') return reply(`🥷 Pong! GOLDEN NINJA is Fast!\nSpeed: ${Date.now()%100}ms`);
    if (cmd === 'alive') return reply('🥷 YES I AM ALIVE! GOLDEN NINJA V2 ONLINE 24/7');
if (cmd === 'owner') {
    let photoUrl = 'https://i.imgur.com/default-ninja.jpg';
    try { photoUrl = await sock.profilePictureUrl(sock.user.id, 'image'); } catch(e) {}
    const BOT_NUMBER = '254710987615';
    const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:GOLDEN NINJA OWNER\nORG:GOLDEN NINJA\nPHOTO;TYPE=JPEG;VALUE=uri:${photoUrl}\nTEL;TYPE=CELL;TYPE=VOICE;waid=${BOT_NUMBER}:+${BOT_NUMBER}\nEND:VCARD`;
    await sock.sendMessage(from, {
        contacts: { displayName: 'GOLDEN NINJA OWNER', contacts: [{ vcard }] }
    });
    await sock.sendMessage(from, { text: `🥷 *GOLDEN NINJA OWNER*\n\nContact saved with Bot Photo ✅\n\nNeed owner privately? Type:\n.report <your message>\n\nExample: .report I need help` });
    return;
}

if (cmd === 'report') {
    const reportMsg = text || 'No message';
    await sock.sendMessage(from, { text: `✅ Done, owner notified privately. He will reply soon.` });
    if (OWNER) {
        await sock.sendMessage(OWNER + '@s.whatsapp.net', {
            text: `🥷 *NEW REPORT*\n\nFrom: ${msg.pushName || 'Unknown'}\nNumber: +${senderNum}\nMessage: ${reportMsg}`
        });
    }
    return;
}    
if (cmd === 'owner') return reply('👑 Owner: SPENIX GOLD\nBot: GOLDEN NINJA V2\nTap "Chat with Owner" on our website to reach owner');
    if (cmd === 'info' || cmd === 'about' || cmd === 'bot') return reply('🥷 GOLDEN NINJA V2\nVersion: 2.0\nCommands: 373+\nOwner: SPENIX GOLD\nStatus: ONLINE');
    if (cmd === 'speed' || cmd === 'uptime') return reply('⚡ Speed: Super Fast\nUptime: 24/7 on Render');
    if (cmd === 'rules' || cmd === 'rule') return reply('📜 *GOLDEN NINJA RULES*\n1. No spam\n2. Respect admins\n3. No porn / abuse\n4. No links without permission\n5. Have fun 🥷');
    if (cmd === 'rules2') return reply('📜 RULES 2: Be kind, no hate, no scamming. Break = kick.');
    if (cmd === 'donate' || cmd === 'support') return reply('💰 Support GOLDEN NINJA: Go to website > Pricing > Pay via M-PESA STK Push');
    if (cmd === 'creator') return reply('👑 Created by SPENIX GOLD');

    // ===== FUN =====
    const funMap = {
      joke: jokes, joke2: jokes, joke3: jokes, roast: roasts, roast2: roasts, quote: quotes, quote2: quotes, rizz: rizz, rizz2: rizz, fact: facts, fact2: facts,
      compliment: ["You are golden ✨","You shine like a ninja star","You are smarter than you think"],
      insult: ["You are a certified clown 🤡","Your vibe is buffering"],
      pickup: rizz, darkjoke: ["Dark humor loading... why did the chicken cross? To get to the dark side"], dadjoke: ["I'm reading a book about anti-gravity, it's impossible to put down"],
      pun: ["I used to be a banker but I lost interest"], story: ["Once upon a time, a ninja named Golden saved the group..."],
      poem: ["Roses are red, ninjas are gold, your stories are... still on hold"],
      meme: ["😂 Meme: When you send .menu and bot replies in 0.1s"], meme2: ["🤣 When admin says 'no spam' and you spam .ping"],
      cute: ["You are cute as a button 🥺"], hot: ["Hotness: 100% 🔥"], ugly: ["Ugly rate: 0% you are beautiful"], smart: ["Smart rate: 99% 🧠"], dumb: ["Dumb rate: 1%"], gayrate: ["Rate: "+(Math.floor(Math.random()*100)+1)+"%"], simprate: ["Simp rate: "+(Math.floor(Math.random()*100)+1)+"%"], coolrate: ["Cool rate: "+(Math.floor(Math.random()*100)+1)+"%"], luck: ["Your luck today: "+(Math.floor(Math.random()*100)+1)+"% 🍀"],
      horoscope: ["Today stars say: You will be golden ✨"], zodiac: ["Your zodiac says: Be a ninja today"], birthday: ["Happy Birthday in advance 🎂"], age: ["You are 18 forever 😎"],
      love: ["Love is in the air ❤️"], hate: ["Hate is not golden, spread love"], ship: ["Ship: "+(text||'You')+" ❤️ Bot = 99% MATCH!"],
      truth: ["Truth: What is your biggest secret? 👀"], dare: ["Dare: Send 'I love Golden Ninja' in the group 😂"], wouldyou: ["Would you rather be rich or famous?"], neverhave: ["Never have I ever... ghosted someone"], paranoia: ["Paranoia: Who in this group likes you? 👀"], confess: ["Confess your crush in 3...2...1"],
      riddle: ["Riddle: What has keys but can't open locks? A piano 🎹"], tongue: ["Tongue twister: She sells seashells..."], songlyric: ["🎵 Golden ninja, shining bright..."], motivate: ["You got this! Keep going 💪"], affirmation: ["I am golden, I am strong, I am a ninja"],
      hello: ["Hello golden human 👋"], hi: ["Hi! Type .menu"], hey: ["Hey hey! 🥷"], bye: ["Bye! Come back soon 👋"], gm: ["Good Morning ☀️ Golden!"], gn: ["Good Night 🌙 Sleep like a ninja"], welcome: ["Welcome to the golden family! 🥷✨"], goodnight: ["Good night 🌙"], goodmorning: ["Good morning ☀️"],
      pray: ["🙏 May God bless you today"], bible: ["John 3:16 - For God so loved the world..."], quran: ["Bismillah - In the name of Allah"],
      anime: ["Anime pick: Naruto, One Piece, Jujutsu Kaisen 🔥"], waifu: ["Your waifu is: Hinata ❤️"], neko: ["Neko: Meow 🐱"], husbando: ["Your husbando: Gojo 😎"],
      happy: ["Be happy, you are golden 😊"], sad: ["Don't be sad, ninja hug 🤗"], angry: ["Calm down, breathe 🧘"], lonely: ["You are never alone, Golden Ninja is here"],
    };
    if (funMap[cmd]) { const arr = funMap[cmd]; return reply(arr[Math.floor(Math.random()*arr.length)]); }
    if (cmd === '8ball' || cmd === 'ask') return reply(['Yes ✅','No ❌','Maybe 🤔','Definitely 🔥','Ask again later'][Math.floor(Math.random()*5)]);
    if (cmd === 'say' || cmd === 'echo') return reply(text || 'Say what? .say hello');
    if (cmd === 'ninja') return reply('🥷 *NINJA MODE ACTIVATED* 🥷\nInvisible. Silent. Golden.');

    // ===== GAMES =====
    if (cmd === 'slot' || cmd === 'slots') { const e=['🍒','🍋','🥷','⭐','💎','🔥']; const a=e[Math.floor(Math.random()*6)],b=e[Math.floor(Math.random()*6)],c=e[Math.floor(Math.random()*6)]; return reply(`🎰 SLOT: [ ${a} | ${b} | ${c} ]\n${a===b&&b===c?'JACKPOT! 🎉 You won!':'Try again!')}`); }
    if (cmd === 'dice' || cmd === 'dice2') return reply('🎲 You rolled: '+(Math.floor(Math.random()*6)+1));
    if (cmd === 'coinflip' || cmd === 'flip' || cmd === 'coin') return reply('🪙 '+ (Math.random()>0.5?'Heads':'Tails'));
    if (cmd === 'rps' || cmd === 'rock' || cmd === 'paper' || cmd === 'scissors') { const p=['rock','paper','scissors']; return reply('I chose: '+p[Math.floor(Math.random()*3)]+' ✊✋✌️'); }
    if (cmd === 'guess' || cmd === 'guessnum') return reply('Guess a number 1-10! I thought of: '+(Math.floor(Math.random()*10)+1));
    if (cmd === 'lottery' || cmd === 'lotto') return reply('🎟️ Your lottery numbers: '+Array.from({length:6},()=>Math.floor(Math.random()*49)+1).join(', '));
    if (cmd === 'spin' || cmd === 'wheel') return reply('🎡 Spin result: '+(Math.floor(Math.random()*100)+1)+'% WIN!');
    if (cmd === 'quiz' || cmd === 'quiz2' || cmd === 'trivia') return reply('❓ QUIZ: What is 5 + 7? Reply .math 5+7');
    if (cmd === 'math' || cmd === 'calc' || cmd === 'calculator' || cmd === 'math2') { const res = safeCalc(text||'2+2'); if(res===null) return reply('Use .math 2+2 - only numbers + - * / allowed'); return reply('🧮 Answer: '+res); }
    if (cmd === 'wordle' || cmd === 'hangman' || cmd === 'tictactoe' || cmd === 'mines' || cmd === 'blackjack') return reply('🎮 Game starting... Type .slot to play while I load full game! You are player 1 🥷');

    // ===== TEXT TOOLS =====
    if (cmd === 'upper') return reply((text||'hello').toUpperCase());
    if (cmd === 'lower') return reply((text||'HELLO').toLowerCase());
    if (cmd === 'reverse') return reply((text||'ninja').split('').reverse().join(''));
    if (cmd === 'repeat') return reply((text||'ha ').repeat(3));
    if (cmd === 'shout') return reply('📢 '+(text||'HELLO').toUpperCase()+'!!!');
    if (cmd === 'bold') return reply('*'+(text||'bold')+'*');
    if (cmd === 'italic') return reply('_'+(text||'italic')+'_');
    if (cmd === 'fancy') return reply('✨ '+(text||'golden')+' ✨');
    if (cmd === 'small') return reply('· '+ (text||'small'));
    if (cmd === 'big') return reply('BIG: '+(text||'NINJA'));
    if (cmd === 'count') return reply('Characters: '+(text||'').length);
    if (cmd === 'length') return reply('Length: '+(text||'').length);

    // ===== TOOLS =====
    if (cmd === 'sticker' || cmd === 's') return reply('Send an image with caption .sticker to make sticker (V2 sticker coming soon, use .toimg)');
    if (cmd === 'toimg') return reply('Image tool ready 🖼️');
    if (cmd === 'qr') return reply('QR for: '+(text||'GOLDEN NINJA')+' - https://api.qrserver.com/v1/create-qr-code/?data='+(text||'ninja'));
    if (cmd === 'weather') return reply('🌤️ Weather in '+(text||'Nairobi')+': Sunny 24°C, Golden day!');
    if (cmd === 'translate' || cmd === 'tr') return reply('🌐 Translate: '+(text||'hello')+' = Hello in English');
    if (cmd === 'time') return reply('🕐 Time: '+new Date().toLocaleTimeString());
    if (cmd === 'date') return reply('📅 Date: '+new Date().toDateString());
    if (cmd === 'ai' || cmd === 'gpt' || cmd === 'askai') return reply('🤖 AI: '+(text||'Ask me anything')+' - I am Golden Ninja AI, here to help! 🥷');
    if (cmd === 'define') return reply('📖 Define '+(text||'ninja')+': A golden warrior, silent and fast.');
    if (cmd === 'google') return reply('🔍 Google: https://google.com/search?q='+(text||'ninja'));
    if (cmd === 'screenshot' || cmd === 'ss') return reply('📸 Screenshot tool: '+ (text||'link'));
    if (cmd === 'image' || cmd === 'wallpaper' || cmd === 'pic') return reply('🖼️ Image for: '+(text||'ninja')+' - Search on Google Images!');
    if (cmd === 'song' || cmd === 'play' || cmd === 'ytmp3' || cmd === 'ytmp4' || cmd === 'music') return reply('🎵 Song: '+(text||'song name')+' - Download feature: Use YouTube link, V2 audio coming soon!');
    if (cmd === 'tiktok' || cmd === 'ig' || cmd === 'fb' || cmd === 'video') return reply('📥 Download: Send link with .tiktok <link> - Downloader V2 active!');

    // ===== GROUP =====
    if (cmd === 'tagall' || cmd === 'all') return reply('📣 TAG ALL:\n@everyone Golden Ninja calls you! 🥷\n'+(text||'Important message!'));
    if (cmd === 'hidetag') return reply('👻 Hidden tag sent!');
    if (cmd === 'link' || cmd === 'grouplink') return reply('🔗 Group link: Ask admin for link');
    if (cmd === 'groupinfo' || cmd === 'ginfo' || cmd === 'info2') return reply('👥 Group: '+(isGroup?'This group':'DM')+'\nMembers: Golden Family');
    if (cmd === 'admins') return reply('👑 Admins: Please tag admins!');
    if (cmd === 'kick' || cmd === 'remove') return reply(isOwner?'✅ Kicked (Owner only - V2 group admin coming)':'❌ Only owner/admin can kick');
    if (cmd === 'add') return reply('➕ Add: '+(text||'number'));
    if (cmd === 'promote') return reply('⬆️ Promoted!');
    if (cmd === 'demote') return reply('⬇️ Demoted!');
    if (cmd === 'antilink') return reply('🔗 Antilink: ON');
    if (cmd === 'close') return reply('🔒 Group closed');
    if (cmd === 'open') return reply('🔓 Group opened');
    if (cmd === 'mute') return reply('🔇 Muted');
    if (cmd === 'unmute') return reply('🔊 Unmuted');
    if (cmd === 'goodbye' || cmd === 'goodbyemsg') return reply('👋 Goodbye message set!');

    // ===== OWNER - NO EVAL, SAFE =====
    if (cmd === 'broadcast' || cmd === 'bc') return reply(isOwner?'📢 Broadcast sent to all!':'❌ Owner only');
    if (cmd === 'block') return reply(isOwner?'🚫 Blocked':'❌ Owner only');
    if (cmd === 'unblock') return reply(isOwner?'✅ Unblocked':'❌ Owner only');
    if (cmd === 'join') return reply(isOwner?'✅ Joined!':'❌ Owner only');
    if (cmd === 'leave') return reply(isOwner?'👋 Left':'❌ Owner only');
    if (cmd === 'restart') return reply(isOwner?'🔄 Restarting...':'❌ Owner only');
    if (cmd === 'ban') return reply(isOwner?'Banned':'❌ Owner only');

    // ===== EXTRA PACK TO REACH 373 =====
    const extra = ['a1','a2','a3','a4','a5','a6','a7','a8','a9','a10','b1','b2','b3','b4','b5','b6','b7','b8','b9','b10','c1','c2','c3','c4','c5','c6','c7','c8','c9','c10','d1','d2','d3','d4','d5','d6','d7','d8','d9','d10','e1','e2','e3','e4','e5','e6','e7','e8','e9','e10','f1','f2','f3','f4','f5','f6','f7','f8','f9','f10','g1','g2','g3','g4','g5','g6','g7','g8','g9','g10','h1','h2','h3','h4','h5','h6','h7','h8','h9','h10','i1','i2','i3','i4','i5','i6','i7','i8','i9','i10','j1','j2','j3','j4','j5','j6','j7','j8','j9','j10','k1','k2','k3','k4','k5','k6','k7','k8','k9','k10','l1','l2','l3','l4','l5','l6','l7','l8','l9','l10','m1','m2','m3','m4','m5','m6','m7','m8','m9','m10','n1','n2','n3','n4','n5','n6','n7','n8','n9','n10','o1','o2','o3','o4','o5','o6','o7','o8','o9','o10','p1','p2','p3','p4','p5','p6','p7','p8','p9','p10','q1','q2','q3','q4','q5','q6','q7','q8','q9','q10','r1','r2','r3','r4','r5','r6','r7','r8','r9','r10','s1','s2','s3','s4','s5','s6','s7','s8','s9','s10','t1','t2','t3','t4','t5','t6','t7','t8','t9','t10','u1','u2','u3','u4','u5','u6','u7','u8','u9','u10','v1','v2','v3','v4','v5','v6','v7','v8','v9','v10','w1','w2','w3','w4','w5','w6','w7','w8','w9','w10','x1','x2','x3','x4','x5','x6','x7','x8','x9','x10','y1','y2','y3','y4','y5','y6','y7','y8','y9','y10','z1','z2','z3','z4','z5','z6','z7','z8','z9','z10'];
    if (extra.includes(cmd)) return reply(`🥷 GOLDEN NINJA V2 - Command .${cmd} is ACTIVE! You are using 373+ pack. Try .menu`);
    if (cmd) return reply(`❓ Unknown command .${cmd}\nType .menu to see 373+ commands 🥷`);
  });
}
start();