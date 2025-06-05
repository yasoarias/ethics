const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { filter } = require('./filterSearchMiddleware');
const app = express();
const port = 3000;
const { OpenAI } = require('openai');
require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

app.use(cors());
app.use(express.json());
app.use(filter);

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// API endpoint for searching
app.post('/search', async (req, res) => {
  const searchQuery = req.body.query;
  console.log(`Received search query: ${searchQuery}`);

  if (!searchQuery) {
    return res.status(400).json({ error: 'Search query is required.' });
  }

  try {
    const searchQuery = req.body.query;
    console.log(`middleware running with search: ${searchQuery}`)

    const completion = await openai.chat.completions.create({
        model: "gpt-4.1",
        messages: [
            {
                role: "system",
                content: "You are an expert in ethics. Only answer questions that are related to ethics, law, morality, or philosophy. Return everyting except the polite AI words on beginning and ending. If the question is unrelated to ethics, respond: 'I'm sorry, but I can only provide answers related to ethics."
            },
            {
                role: "user",
                content: searchQuery
            }
        ]
    })

    const result = completion.choices[0].message.content

    console.log(result)

    return res.json({ result })

  } catch (error) {
    res.status(500).json({ error: 'Error fetching search results.' });
  }
});

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
}); 