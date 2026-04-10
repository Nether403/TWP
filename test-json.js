const OpenAI = require('openai');
require('dotenv').config({ path: '.env.local' });

const openrouter = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY || '',
  defaultHeaders: {
    'HTTP-Referer': 'http://localhost:5000',
    'X-Title': 'The Witness Protocol Foundation',
  },
});

async function test() {
  try {
    const response = await openrouter.chat.completions.create({
      model: 'anthropic/claude-sonnet-4',
      messages: [{ role: 'user', content: 'Say OK' }],
      response_format: { type: 'json_object' }
    });
    console.log("Success with json_object");
  } catch (err) {
    console.log("Crash with json_object:", err.message);
  }
}
test();
