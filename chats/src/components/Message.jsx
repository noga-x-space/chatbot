import React from "react";

const Message = ({ role, content }) => (
  <div className={`message ${role === "user" ? "user" : "bot"}`}>
    <strong>{role === "user" ? "You" : "Bot"}:</strong> {content}
  </div>
);

export default Message;
