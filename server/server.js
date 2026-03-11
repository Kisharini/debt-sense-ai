import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai'; 

const app = express();
app.use(cors());
app.use(express.json());

const client = new GoogleGenAI({ apiKey: "AIzaSyCkjB6abHrIAFQHT61375LwevuDjBWOGS4" });

app.post("/chat", async (req, res) => {
  try {
    const { message, debt, budget } = req.body || {};

    if (!message) {
      return res.json({ reply: "No message received." });
    }

    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash', 
      contents: [{
        role: 'user',
        parts: [{
          text: `You are DebtSense AI, a financial coach for university students.
                 User financial data: Total Debt: RM${debt}, Monthly Budget: RM${budget}.
                 User message: ${message}
                 Give simple advice to help avoid debt traps.`
        }]
      }]
    });

    const text = response.text || "I couldn't generate a response.";

    res.json({ reply: text });

  } catch (error) {
    console.error("Gemini error:", error);
    res.status(500).json({ reply: "Gemini AI error." });
  }
});

app.listen(3000, "0.0.0.0", () => {
  console.log("DebtSense AI Server running on port 3000");
});

app.use(cors({
    origin: 'http://localhost:8081',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json());

app.get('/risk-score', (req, res) => {
    res.json({ score: 85 })
});
