import React from "react";
import "./ChatbotButton.css";

const ChatbotButton = ({ toggleChatbot }) => {
  return (
    <button className="chatbot-floating-btn" onClick={toggleChatbot}>
      💬
    </button>
  );
};

export default ChatbotButton;
