import OpenAI from "openai";
import express from "express";
import cors from "cors";
import multer from "multer";
import { exec } from "child_process";
import fs from "fs";
import path from "path";

const app = express();
const PORT = process.env.PORT ?? 5000;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Access the API key from environment variable
});

const upload = multer({ dest: "uploads/" }); // Temporary storage for uploaded files

// Helper to parse documents
const parseDocument = (filePath) => {
  return new Promise((resolve, reject) => {
    exec(`python parse_document.py ${filePath}`, (error, stdout, stderr) => {
      if (error) {
        console.error("Error parsing document:", stderr);
        return reject(stderr || "Error parsing document");
      }
      resolve(stdout.trim());
    });
  });
};

// Chat endpoint
app.post("/api/chat", upload.single("file"), async (req, res) => {
  try {
    console.log("File received:", req.file);
    console.log("Messages received:", req.body.messages);

    const parsedMessages = JSON.parse(req.body.messages || "[]"); // Fallback to an empty array if undefined
    console.log("Parsed messages:", parsedMessages);

    if (!parsedMessages.length) {
      return res.status(400).json({ error: "No messages found" });
    }

    let documentContent = "";

    if (req.file) {
      console.log("File path for parsing:", req.file.path);
      try {
        documentContent = await parseDocument(req.file.path);
        console.log("Parsed document content:", documentContent);
      } catch (error) {
        console.error("Error parsing document:", error);
        return res.status(500).json({ error: "Error parsing document" });
      }
    }

    const queryContext = documentContent
      ? `${documentContent}\n\n${
          parsedMessages[parsedMessages.length - 1].content
        }`
      : parsedMessages[parsedMessages.length - 1].content;

    console.log("Query context:", queryContext);

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        ...parsedMessages,
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: queryContext },
      ],
    });

    const botMessage = {
      role: "assistant",
      content: response.choices[0].message.content,
    };

    res.json({ reply: botMessage.content });
  } catch (error) {
    console.error("Error in /api/chat:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Cleanup uploaded files
app.use((req, res, next) => {
  if (req.file && fs.existsSync(req.file.path)) {
    fs.unlink(req.file.path, (err) => {
      if (err) console.error("Error deleting file:", err);
    });
  }
  next();
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
