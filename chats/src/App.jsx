import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainApp from "./components/MainApp";
import Message from "./components/Message";
import MessageList from "./components/MessageList";
import ChatWindow from "./components/ChatWindow";
import "./App.css";

const TITLE = "Chatbot.ai";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div className="App">
        <title> {TITLE} </title>

        <Routes>
          <Route path="/" element={<MainApp />} />
        </Routes>

        <footer />
      </div>
    </Router>
  );
}

export default App;
