// frontend/pages/api/chat.js
import openai from '../../lib/openai';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message } = req.body;

    try {
      const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant specializing in health and exercise guidance.' },
          { role: 'user', content: message },
        ],
      });

      const reply = completion.data.choices[0].message.content;
      res.status(200).json({ reply });
    } catch (error) {
      console.error('OpenAI API error:', error);
      res.status(500).json({ error: 'Failed to fetch response from OpenAI.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
