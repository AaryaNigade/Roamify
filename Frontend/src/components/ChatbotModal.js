import React, { useState, useEffect, useRef } from "react"; // added useRef
import "./ChatbotModal.css";

const ChatbotModal = ({ toggleChatbot }) => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hey there! I'm Roamy — your travel buddy 🧭.\nHow can I help you plan your adventure?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingDots, setTypingDots] = useState("");

  const messagesEndRef = useRef(null); // 👈 ref to the bottom of chat

  useEffect(() => {
    let interval;
    if (isTyping) {
      interval = setInterval(() => {
        setTypingDots((prev) =>
          prev.length >= 3 ? "" : prev + "."
        );
      }, 500);
    } else {
      setTypingDots("");
    }
    return () => clearInterval(interval);
  }, [isTyping]);

  useEffect(() => {
    // 👇 scrolls down automatically when messages update
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (input.trim() === "") return;
  
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
  
    const randomDelay = Math.floor(Math.random() * 300) + 600; 
    // Random between 600ms and 900ms
  
    setTimeout(() => {
      const botMessage = {
        sender: "bot",
        text: "Roamy's still learning! 🌐 But I'll soon help with real travel plans.",
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, randomDelay); // 👈 now delay is different every time!
  };  

  return (
    <div className="chatbot-modal">
      <div className="chatbot-header">
        <span className="chatbot-title">Roamy –</span>
        <span className="chatbot-subtitle">Your Travel Buddy by Roamify</span>
        <button className="close-btn" onClick={toggleChatbot}>
          ✖
        </button>
      </div>

      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {isTyping && (
          <div className="message bot typing">
            Roamy is typing{typingDots}
          </div>
        )}
        <div ref={messagesEndRef} /> {/* 👈 scrolls to here */}
      </div>

      <div className="chatbot-input">
        <input
          type="text"
          value={input}
          placeholder="Ask Roamy anything about your trip..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatbotModal;
