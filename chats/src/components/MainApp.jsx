import React, { useState } from "react";
import ChatWindow from "./ChatWindow";
import axios from "axios";

const MainApp = () => {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello and Welcome to Noga's Chatbot!" },
  ]);
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null); // State for file upload

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSend = async () => {
    if (!input.trim() && !file) {
      alert("Please provide a message or upload a file!");
      return;
    }

    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);

    const formData = new FormData();
    formData.append("messages", JSON.stringify([...messages, userMessage]));
    if (file) {
      formData.append("file", file);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/chat",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const botMessage = { role: "assistant", content: response.data.reply };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error:", error);
    }

    setInput(""); // Clear input field
    setFile(null); // Clear file input
  };

  return (
    <div className="App">
      <ChatWindow messages={messages} />
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <label className="file-upload">
          <input type="file" onChange={handleFileChange} />
          📎
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default MainApp;
