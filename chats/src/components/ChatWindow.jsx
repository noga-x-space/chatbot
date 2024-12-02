import React from "react";
import MessageList from "./MessageList";

const ChatWindow = ({ messages }) => {
  return <div className="chat-window"><MessageList messages={messages} /></div>;
};

export default ChatWindow;
