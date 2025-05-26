
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const OpenAI = require("openai");
const path = require("path");

require("dotenv").config();  // Load environment variables from .env

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(__dirname));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,  // Use API key from .env file
});

app.post("/ask", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You're a helpful study assistant." },
        { role: "user", content: userMessage },
      ],
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error("OpenAI API error:", error.response?.data || error.message || error);
    res.status(500).json({ reply: "Something went wrong. Please try again later." });
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "project.html"));
});

app.listen(3000, () => console.log("✅ Server running at http://localhost:3000"));
