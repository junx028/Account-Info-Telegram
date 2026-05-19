require('dotenv').config();
const bot = require('../src/bot');

const BOT_TOKEN = process.env.BOT_TOKEN;
const WEBHOOK_URL = process.env.WEBHOOK_URL;

// Set webhook
if (WEBHOOK_URL) {
  bot.setWebHook(`${WEBHOOK_URL}`);
  console.log(`✅ Webhook set to: ${WEBHOOK_URL}`);
}

// Export handler untuk Vercel
module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const update = req.body;
    
    if (update) {
      try {
        await bot.processUpdate(update);
        res.status(200).json({ status: 'ok' });
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed' });
      }
    } else {
      res.status(400).json({ error: 'No update' });
    }
  } else if (req.method === 'GET') {
    res.status(200).json({ 
      status: 'online',
      bot: 'Account Info Veldora',
      owner: '@xnecz',
      channel: '@LeguminY',
      version: '1.0.0',
      features: ['User Info', 'Chat Info', 'Refresh', 'Premium Emoji', 'Permanent Link']
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
