const TelegramBot = require('node-telegram-bot-api');
const moment = require('moment-timezone');

const BOT_TOKEN = process.env.BOT_TOKEN;
const WEBHOOK_URL = process.env.WEBHOOK_URL;

const bot = new TelegramBot(BOT_TOKEN);

// ==================== CONFIG ====================
const OWNER_USERNAME = '@xnecz';
const CHANNEL_USERNAME = '@LeguminY';
const CHANNEL_URL = 'https://t.me/LeguminY';
const OWNER_URL = 'https://t.me/xnecz';
const ROOM_URL = 'https://t.me/LeguminY';
const BOT_NAME = 'Account Info Veldora';
const BOT_VERSION = '1.0.0';

// ==================== EMOJI PREMIUM ====================
const emoji = {
  crown: '<tg-emoji emoji-id="5411301743738777449">🎩</tg-emoji>',
  bell: '<tg-emoji emoji-id="5841403144604487992">🔔</tg-emoji>',
  clock: '<tg-emoji emoji-id="5402355073458123173">⌛️</tg-emoji>',
  computer: '<tg-emoji emoji-id="5992087137267225105">💻</tg-emoji>',
  user: '<tg-emoji emoji-id="5879770735999717115">👤</tg-emoji>',
  chart: '<tg-emoji emoji-id="5931472654660800739">📊</tg-emoji>',
  skull: '<tg-emoji emoji-id="6165775219580472827">☠</tg-emoji>',
  star: '<tg-emoji emoji-id="5368499186293564526">⭐</tg-emoji>',
  rocket: '<tg-emoji emoji-id="5463039890449003865">🚀</tg-emoji>',
  globe: '<tg-emoji emoji-id="5409087245716056598">🌐</tg-emoji>',
  fire: '<tg-emoji emoji-id="5463257460607315631">🔥</tg-emoji>',
  heart: '<tg-emoji emoji-id="5463343407197878047">❤️</tg-emoji>',
  shield: '<tg-emoji emoji-id="5411419730785369685">🛡️</tg-emoji>',
  group: '<tg-emoji emoji-id="5411329291659013967">👥</tg-emoji>',
  robot: '<tg-emoji emoji-id="5408997339165653167">🤖</tg-emoji>',
  premium: '<tg-emoji emoji-id="5363787894932662327">💎</tg-emoji>',
  phone: '<tg-emoji emoji-id="5411430859045626151">📱</tg-emoji>',
  info: '<tg-emoji emoji-id="5879770735999717115">ℹ️</tg-emoji>',
  id: '<tg-emoji emoji-id="5931472654660800739">🆔</tg-emoji>',
  dc: '<tg-emoji emoji-id="5409087245716056598">🌐</tg-emoji>',
  photo: '<tg-emoji emoji-id="5368499186293564526">🖼</tg-emoji>',
  lang: '<tg-emoji emoji-id="5411419730785369685">🌍</tg-emoji>',
  date: '<tg-emoji emoji-id="5402355073458123173">🗓</tg-emoji>',
  link: '<tg-emoji emoji-id="5463257460607315631">🔗</tg-emoji>',
  bio: '<tg-emoji emoji-id="5463343407197878047">📝</tg-emoji>',
  pin: '<tg-emoji emoji-id="5463039890449003865">📍</tg-emoji>',
  verified: '<tg-emoji emoji-id="5363787894932662327">✅</tg-emoji>',
  scam: '<tg-emoji emoji-id="6165775219580472827">⚠️</tg-emoji>',
  restricted: '<tg-emoji emoji-id="5411329291659013967">🚫</tg-emoji>',
  fake: '<tg-emoji emoji-id="5408997339165653167">👻</tg-emoji>',
  support: '<tg-emoji emoji-id="5411430859045626151">🎧</tg-emoji>',
  owner: '<tg-emoji emoji-id="5463039890449003865">👑</tg-emoji>',
  channel: '<tg-emoji emoji-id="5409087245716056598">📢</tg-emoji>'
};

// ==================== EMOJI ID UNTUK BUTTON ====================
const emojiBtn = {
  refresh: '5411430859045626151',
  developer: '5463039890449003865',
  help: '5463343407197878047',
  permanent: '5409087245716056598',
  channel: '5409087245716056598',
  room: '5363787894932662327',
  owner: '5463039890449003865'
};

// ==================== GET USER PROFILE PHOTO ====================
async function getUserProfilePhoto(userId) {
  try {
    const photos = await bot.getUserProfilePhotos(userId, { limit: 1 });
    if (photos && photos.photos.length > 0) {
      return photos.photos[0][photos.photos[0].length - 1].file_id;
    }
    return null;
  } catch (error) {
    return null;
  }
}

// ==================== GET FULL NAME ====================
function getFullName(user) {
  let name = '';
  if (user.first_name) name += user.first_name;
  if (user.last_name) name += ' ' + user.last_name;
  return name.trim() || 'N/A';
}

// ==================== GET DC ID ====================
function getDC(userId) {
  const num = parseInt(String(userId).slice(-2));
  
  if (num >= 1 && num <= 3) return 'DC1';
  if (num === 4) return 'DC2';
  if (num === 5) return 'DC3';
  if (num === 6) return 'DC4';
  if (num >= 7 && num <= 10) return 'DC5';
  
  return 'Unknown';
}

// ==================== FORMAT DATE ====================
function formatDate(timestamp) {
  return moment.unix(timestamp).tz('Asia/Jakarta').format('DD MMMM YYYY, HH:mm:ss WIB');
}

// ==================== FORMAT DATE SHORT ====================
function formatDateShort(timestamp) {
  return moment.unix(timestamp).tz('Asia/Jakarta').format('DD/MM/YYYY');
}

// ==================== GET REGISTRATION DATE (ESTIMATE) ====================
function getRegistrationDate(userId) {
  const epoch = 1577836800;
  const idPart = parseInt(String(userId).slice(0, 5));
  const estimatedTimestamp = epoch + (idPart * 86400);
  return formatDateShort(estimatedTimestamp);
}

// ==================== HANDLER /start ====================
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const user = msg.from;
  const chat = msg.chat;

  const firstName = user.first_name || 'N/A';
  const lastName = user.last_name || 'N/A';
  const fullName = getFullName(user);
  const username = user.username ? `@${user.username}` : 'N/A';
  const userId = user.id;
  const isPremium = user.is_premium || false;
  const languageCode = user.language_code || 'Unknown';
  const isBot = user.is_bot || false;
  const dcId = getDC(userId);
  
  const chatType = chat.type;
  const chatTitle = chat.title || 'N/A';
  const chatUsername = chat.username ? `@${chat.username}` : 'N/A';
  const chatIdInfo = chat.id;
  
  const photoId = await getUserProfilePhoto(userId);
  const photoStatus = photoId ? 'Available' : 'None';
  
  const premiumStatus = isPremium ? 'Yes ⭐' : 'No';
  
  const regDate = getRegistrationDate(userId);
  
  const permanentLink = `tg://user?id=${userId}`;
  
  const currentDate = formatDate(msg.date);

  const caption = 
    `<blockquote>${emoji.crown}°${BOT_NAME}</blockquote>\n\n` +
    `${emoji.user} <b>User Information</b>\n` +
    `━━━━━━━━━━━━━━━━━━━━━\n\n` +
    `${emoji.id} <b>ID:</b> <code>${userId}</code>\n` +
    `${emoji.user} <b>First Name:</b> ${firstName}\n` +
    `${emoji.group} <b>Last Name:</b> ${lastName}\n` +
    `${emoji.phone} <b>Full Name:</b> ${fullName}\n` +
    `${emoji.link} <b>Username:</b> ${username}\n` +
    `${emoji.dc} <b>DC ID:</b> ${dcId}\n` +
    `${emoji.photo} <b>Photo:</b> ${photoStatus}\n` +
    `${emoji.premium} <b>Premium:</b> ${premiumStatus}\n` +
    `${emoji.robot} <b>Bot:</b> ${isBot ? 'Yes' : 'No'}\n` +
    `${emoji.lang} <b>Language:</b> ${languageCode}\n` +
    `${emoji.verified} <b>Verified:</b> No\n` +
    `${emoji.scam} <b>Scam:</b> No\n` +
    `${emoji.restricted} <b>Restricted:</b> No\n` +
    `${emoji.fake} <b>Fake:</b> No\n\n` +
    `${emoji.date} <b>Registration Date:</b> <a href="${permanentLink}">Click Here</a>\n` +
    `${emoji.link} <b>Permanent Link:</b> <a href="${permanentLink}">${firstName}</a>\n\n` +
    `${emoji.info} <b>Chat Information</b>\n` +
    `━━━━━━━━━━━━━━━━━━━━━\n\n` +
    `${emoji.id} <b>Chat ID:</b> <code>${chatIdInfo}</code>\n` +
    `${emoji.info} <b>Chat Type:</b> ${chatType}\n` +
    `${emoji.globe} <b>Chat Title:</b> ${chatTitle}\n` +
    `${emoji.link} <b>Chat Username:</b> ${chatUsername}\n\n` +
    `${emoji.clock} <b>Request Date:</b> ${currentDate}\n` +
    `${emoji.bell} <b>Bot Version:</b> ${BOT_VERSION}\n\n` +
    `${emoji.owner} <b>Owner:</b> <a href="${OWNER_URL}">${OWNER_USERNAME}</a>\n` +
    `${emoji.channel} <b>Channel:</b> <a href="${CHANNEL_URL}">${CHANNEL_USERNAME}</a>\n\n` +
    `<blockquote>${emoji.skull} Info lengkap akun Telegram Anda. Silakan gunakan tombol di bawah.</blockquote>`;

  // Send photo atau text
  if (photoId) {
    await bot.sendPhoto(chatId, photoId, {
      caption: caption,
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [
            { text: "𝚁𝚎𝚏𝚛𝚎𝚜𝚑 𝙸𝚗𝚏𝚘", callback_data: "refresh", style: "success", icon_custom_emoji_id: emojiBtn.refresh }
          ],
          [
            { text: "𝙾𝚠𝚗𝚎𝚛", url: OWNER_URL, style: "danger", icon_custom_emoji_id: emojiBtn.owner },
            { text: "𝙲𝚑𝚊𝚗𝚗𝚎𝚕", url: CHANNEL_URL, style: "success", icon_custom_emoji_id: emojiBtn.channel }
          ],
          [
            { text: "𝙿𝚎𝚛𝚖𝚊𝚗𝚎𝚗𝚝 𝙻𝚒𝚗𝚔", url: permanentLink, style: "primary", icon_custom_emoji_id: emojiBtn.permanent }
          ],
          [
            { text: "𝙷𝚎𝚕𝚙", callback_data: "help", style: "primary", icon_custom_emoji_id: emojiBtn.help }
          ]
        ]
      }
    });
  } else {
    await bot.sendMessage(chatId, caption, {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [
            { text: "𝚁𝚎𝚏𝚛𝚎𝚜𝚑 𝙸𝚗𝚏𝚘", callback_data: "refresh", style: "success", icon_custom_emoji_id: emojiBtn.refresh }
          ],
          [
            { text: "𝙾𝚠𝚗𝚎𝚛", url: OWNER_URL, style: "danger", icon_custom_emoji_id: emojiBtn.owner },
            { text: "𝙲𝚑𝚊𝚗𝚗𝚎𝚕", url: CHANNEL_URL, style: "success", icon_custom_emoji_id: emojiBtn.channel }
          ],
          [
            { text: "𝙿𝚎𝚛𝚖𝚊𝚗𝚎𝚗𝚝 𝙻𝚒𝚗𝚔", url: permanentLink, style: "primary", icon_custom_emoji_id: emojiBtn.permanent }
          ],
          [
            { text: "𝙷𝚎𝚕𝚙", callback_data: "help", style: "primary", icon_custom_emoji_id: emojiBtn.help }
          ]
        ]
      }
    });
  }
});

// ==================== HANDLER CALLBACK ====================
bot.on('callback_query', async (query) => {
  const chatId = query.message.chat.id;
  const messageId = query.message.message_id;
  const user = query.from;
  const chat = query.message.chat;

  const firstName = user.first_name || 'N/A';
  const lastName = user.last_name || 'N/A';
  const fullName = getFullName(user);
  const username = user.username ? `@${user.username}` : 'N/A';
  const userId = user.id;
  const isPremium = user.is_premium || false;
  const languageCode = user.language_code || 'Unknown';
  const isBot = user.is_bot || false;
  const dcId = getDC(userId);
  
  const chatType = chat.type;
  const chatTitle = chat.title || 'N/A';
  const chatUsername = chat.username ? `@${chat.username}` : 'N/A';
  const chatIdInfo = chat.id;
  
  const photoId = await getUserProfilePhoto(userId);
  const photoStatus = photoId ? 'Available' : 'None';
  const premiumStatus = isPremium ? 'Yes ⭐' : 'No';
  const regDate = getRegistrationDate(userId);
  const permanentLink = `tg://user?id=${userId}`;
  const currentDate = formatDate(Date.now() / 1000);

  if (query.data === 'refresh') {
    const caption = 
      `<blockquote>${emoji.crown}°${BOT_NAME} (𝚁𝚎𝚏𝚛𝚎𝚜𝚑𝚎𝚍)</blockquote>\n\n` +
      `${emoji.user} <b>User Information</b>\n` +
      `━━━━━━━━━━━━━━━━━━━━━\n\n` +
      `${emoji.id} <b>ID:</b> <code>${userId}</code>\n` +
      `${emoji.user} <b>First Name:</b> ${firstName}\n` +
      `${emoji.group} <b>Last Name:</b> ${lastName}\n` +
      `${emoji.phone} <b>Full Name:</b> ${fullName}\n` +
      `${emoji.link} <b>Username:</b> ${username}\n` +
      `${emoji.dc} <b>DC ID:</b> ${dcId}\n` +
      `${emoji.photo} <b>Photo:</b> ${photoStatus}\n` +
      `${emoji.premium} <b>Premium:</b> ${premiumStatus}\n` +
      `${emoji.robot} <b>Bot:</b> ${isBot ? 'Yes' : 'No'}\n` +
      `${emoji.lang} <b>Language:</b> ${languageCode}\n` +
      `${emoji.verified} <b>Verified:</b> No\n` +
      `${emoji.scam} <b>Scam:</b> No\n` +
      `${emoji.restricted} <b>Restricted:</b> No\n` +
      `${emoji.fake} <b>Fake:</b> No\n\n` +
      `${emoji.date} <b>Registration Date:</b> <a href="${permanentLink}">Click Here</a>\n` +
      `${emoji.link} <b>Permanent Link:</b> <a href="${permanentLink}">${firstName}</a>\n\n` +
      `${emoji.info} <b>Chat Information</b>\n` +
      `━━━━━━━━━━━━━━━━━━━━━\n\n` +
      `${emoji.id} <b>Chat ID:</b> <code>${chatIdInfo}</code>\n` +
      `${emoji.info} <b>Chat Type:</b> ${chatType}\n` +
      `${emoji.globe} <b>Chat Title:</b> ${chatTitle}\n` +
      `${emoji.link} <b>Chat Username:</b> ${chatUsername}\n\n` +
      `${emoji.clock} <b>Refresh Date:</b> ${currentDate}\n` +
      `${emoji.bell} <b>Bot Version:</b> ${BOT_VERSION}\n\n` +
      `${emoji.owner} <b>Owner:</b> <a href="${OWNER_URL}">${OWNER_USERNAME}</a>\n` +
      `${emoji.channel} <b>Channel:</b> <a href="${CHANNEL_URL}">${CHANNEL_USERNAME}</a>\n\n` +
      `<blockquote>${emoji.skull} Info berhasil direfresh! Data terbaru.</blockquote>`;

    if (photoId) {
      await bot.editMessageMedia({
        type: 'photo',
        media: photoId,
        caption: caption,
        parse_mode: 'HTML'
      }, {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: {
          inline_keyboard: [
            [
              { text: "𝚁𝚎𝚏𝚛𝚎𝚜𝚑 𝙸𝚗𝚏𝚘", callback_data: "refresh", style: "success", icon_custom_emoji_id: emojiBtn.refresh }
            ],
            [
              { text: "𝙾𝚠𝚗𝚎𝚛", url: OWNER_URL, style: "danger", icon_custom_emoji_id: emojiBtn.owner },
              { text: "𝙲𝚑𝚊𝚗𝚗𝚎𝚕", url: CHANNEL_URL, style: "success", icon_custom_emoji_id: emojiBtn.channel }
            ],
            [
              { text: "𝙿𝚎𝚛𝚖𝚊𝚗𝚎𝚗𝚝 𝙻𝚒𝚗𝚔", url: permanentLink, style: "primary", icon_custom_emoji_id: emojiBtn.permanent }
            ],
            [
              { text: "𝙷𝚎𝚕𝚙", callback_data: "help", style: "primary", icon_custom_emoji_id: emojiBtn.help }
            ]
          ]
        }
      });
    } else {
      await bot.editMessageText(caption, {
        chat_id: chatId,
        message_id: messageId,
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [
              { text: "𝚁𝚎𝚏𝚛𝚎𝚜𝚑 𝙸𝚗𝚏𝚘", callback_data: "refresh", style: "success", icon_custom_emoji_id: emojiBtn.refresh }
            ],
            [
              { text: "𝙾𝚠𝚗𝚎𝚛", url: OWNER_URL, style: "danger", icon_custom_emoji_id: emojiBtn.owner },
              { text: "𝙲𝚑𝚊𝚗𝚗𝚎𝚕", url: CHANNEL_URL, style: "success", icon_custom_emoji_id: emojiBtn.channel }
            ],
            [
              { text: "𝙿𝚎𝚛𝚖𝚊𝚗𝚎𝚗𝚝 𝙻𝚒𝚗𝚔", url: permanentLink, style: "primary", icon_custom_emoji_id: emojiBtn.permanent }
            ],
            [
              { text: "𝙷𝚎𝚕𝚙", callback_data: "help", style: "primary", icon_custom_emoji_id: emojiBtn.help }
            ]
          ]
        }
      });
    }

    await bot.answerCallbackQuery(query.id, {
      text: '✅ Info berhasil direfresh!',
      show_alert: false
    });
  } else if (query.data === 'help') {
    await bot.answerCallbackQuery(query.id, {
      text: `🤖 ${BOT_NAME}\n\nOwner: ${OWNER_USERNAME}\nChannel: ${CHANNEL_USERNAME}\n\nBot untuk menampilkan info akun Telegram Anda secara detail!`,
      show_alert: true
    });
  }
});

// ==================== EXPORT BOT ====================
module.exports = bot;
