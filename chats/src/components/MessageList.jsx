import React from 'react'
import Message from './Message';

const MessageList = ({ messages }) => (
  <div>
    {messages.map((msg, index) => (
      <Message key={index} role={msg.role} content={msg.content} />
    ))}
  </div>
);

export default MessageList