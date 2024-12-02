import React, { useState } from "react";
import ChatWindow from "./ChatWindow";
import axios from "axios";

const MainApp = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  // const [loading, setLoading] = useState(false); // Tracks loading state for the bot response

  const handleSend = async () => {
    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post("http://localhost:5000/api/chat", {
        messages: [...messages, userMessage],
      });
      const botMessage = { role: "assistant", content: response.data.reply };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error(error);
    }

    setInput("");
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
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
  {
    /* <MessageInput onSend={handleSendMessage} disabled={loading} /> */
  }
};

export default MainApp;
