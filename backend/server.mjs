import OpenAI from "openai";
import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT ?? 5000;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Access the API key from environment variable
});

/// note - a better approach for memory handling is using an external storage, but since this project is local I logged it to a local file
// for a cloud based approach i would upload the memory to a storage like aws buckets or a shared fs

let conversationHistory = []; // This resets when the server restarts


app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;

  

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", 
      messages,
    });
    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// async function test() {
//     curl https://api.openai.com/v1/chat/completions \
//   -H "Content-Type: application/json" \
//   -H "Authorization: Bearer $OPENAI_API_KEY" \
//   -d '{
//      "model": "gpt-4o-mini",
//      "messages": [{"role": "user", "content": "Say this is a test!"}],
//      "temperature": 0.7
//    }'
// }
// const MSG = "please say hello";
// async function getHaiku() {
//   // Request to OpenAI API
//   const completion = await openai.chat.completions.create({
//     model: "gpt-4o-mini", // Choose the model (can be GPT-4 or others)
//     messages: [
//       { role: "system", content: "You are a helpful assistant." },
//       {
//         role: "user",
//         content: MSG,
//       },
//     ],
//   });

//   // Log the generated response (the haiku)
//   console.log(completion.choices[0].message);
// }

// // Call the function
// getHaiku();
