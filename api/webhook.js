require('dotenv').config();

const BOT_TOKEN = process.env.BOT_TOKEN;
const WEBHOOK_URL = process.env.WEBHOOK_URL;

// Set webhook
fetch(`https://api.telegram.org/bot${BOT_TOKEN}/setWebhook?url=${WEBHOOK_URL}&drop_pending_updates=true`)
  .then(r => r.json())
  .then(d => console.log('Webhook:', d));

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const body = req.body;
    console.log('📩 Update masuk:', JSON.stringify(body));
    
    if (body && body.message) {
      const msg = body.message;
      const chatId = msg.chat.id;
      const text = msg.text || '';
      const user = msg.from;
      
      if (text === '/start' || text === '/start@VellInfoBot') {
        const firstName = user.first_name || 'N/A';
        const lastName = user.last_name || 'N/A';
        const username = user.username ? '@' + user.username : 'N/A';
        const userId = user.id;
        const isPremium = user.is_premium ? 'Yes ⭐' : 'No';
        const lang = user.language_code || 'Unknown';
        const isBot = user.is_bot ? 'Yes' : 'No';
        
        const reply = 
          `<blockquote>🎩°ACCOUNT INFO VELDORA</blockquote>\n\n` +
          `👤 <b>User Information</b>\n` +
          `━━━━━━━━━━━━━━━━━\n\n` +
          `🆔 <b>ID:</b> <code>${userId}</code>\n` +
          `👤 <b>First Name:</b> ${firstName}\n` +
          `👥 <b>Last Name:</b> ${lastName}\n` +
          `🔗 <b>Username:</b> ${username}\n` +
          `💎 <b>Premium:</b> ${isPremium}\n` +
          `🤖 <b>Bot:</b> ${isBot}\n` +
          `🌍 <b>Language:</b> ${lang}\n\n` +
          `👑 <b>Owner:</b> @xnecz\n` +
          `📢 <b>Channel:</b> @LeguminY\n\n` +
          `<blockquote>☠ Info akun Telegram Anda.</blockquote>`;
        
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: reply,
            parse_mode: 'HTML'
          })
        });
        
        console.log('✅ Balasan terkirim ke:', chatId);
      }
    }
    
    res.status(200).json({ ok: true });
  } else {
    res.status(
