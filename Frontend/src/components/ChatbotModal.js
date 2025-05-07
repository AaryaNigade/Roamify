import React, { useState, useEffect, useRef } from "react";
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
  const [isPlannerMode, setIsPlannerMode] = useState(false);

  const [plannerInput, setPlannerInput] = useState({
    destination: "",
    budget: "",
    days: "",
    interests: {
      culture: false,
      adventure: false,
      food: false,
    },
  });

  const messagesEndRef = useRef(null);

  useEffect(() => {
    let interval;
    if (isTyping) {
      interval = setInterval(() => {
        setTypingDots((prev) => (prev.length >= 3 ? "" : prev + "."));
      }, 500);
    } else {
      setTypingDots("");
    }
    return () => clearInterval(interval);
  }, [isTyping]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (input.trim() === "") return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    const randomDelay = Math.floor(Math.random() * 300) + 600;

    setTimeout(() => {
      const botMessage = {
        sender: "bot",
        text: "Roamy's still learning! 🌐 But I'll soon help with real travel plans.",
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, randomDelay);
  };

  const handlePlannerSubmit = () => {
    const { destination, budget, days, interests } = plannerInput;

    if (!destination || !budget || !days) {
      alert("Please fill in all required fields.");
      return;
    }

    const selectedInterests = Object.entries(interests)
      .filter(([key, val]) => val)
      .map(([key]) => key)
      .join(", ");

    const botMessage = {
      sender: "bot",
      text: `Here’s your mock itinerary for ${destination} 🌍\nBudget: ₹${budget} | Days: ${days}\nInterests: ${selectedInterests || "None"}\n\nDay 1: Local attractions, stay at budget hotel\nDay 2: Explore cultural sites, street food tour\n\n📌 (Note: Real planning coming soon!)`,
    };

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: "Generated a trip plan!" },
      botMessage,
    ]);
    setIsPlannerMode(false);
  };

  const handleInterestChange = (key) => {
    setPlannerInput((prev) => ({
      ...prev,
      interests: { ...prev.interests, [key]: !prev.interests[key] },
    }));
  };

  return (
    <div className="chatbot-modal">
      <div className="chatbot-header">
        <span className="chatbot-title">Roamy –</span>
        <span className="chatbot-subtitle">Your Travel Buddy</span>
        <button className="close-btn" onClick={toggleChatbot}>
          ✖
        </button>
      </div>

      <div className="chatbot-messages">
        {isPlannerMode ? (
          <div className="planner-form">
            <h4>📝 Plan Your Trip</h4>
            <label>
              Destination:
              <input
                type="text"
                value={plannerInput.destination}
                onChange={(e) =>
                  setPlannerInput({ ...plannerInput, destination: e.target.value })
                }
              />
            </label>
            <label>
              Budget (₹):
              <input
                type="number"
                value={plannerInput.budget}
                onChange={(e) =>
                  setPlannerInput({ ...plannerInput, budget: e.target.value })
                }
              />
            </label>
            <label>
              Days:
              <input
                type="number"
                min="1"
                max="10"
                value={plannerInput.days}
                onChange={(e) =>
                  setPlannerInput({ ...plannerInput, days: e.target.value })
                }
              />
            </label>
            <div>
              Interests:
              <label>
                <input
                  type="checkbox"
                  checked={plannerInput.interests.culture}
                  onChange={() => handleInterestChange("culture")}
                />
                Culture
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={plannerInput.interests.adventure}
                  onChange={() => handleInterestChange("adventure")}
                />
                Adventure
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={plannerInput.interests.food}
                  onChange={() => handleInterestChange("food")}
                />
                Food
              </label>
            </div>
            <button onClick={handlePlannerSubmit}>Generate Itinerary</button>
            <button onClick={() => setIsPlannerMode(false)}>← Back to Chat</button>
          </div>
        ) : (
          <>
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div className="message bot typing">Roamy is typing{typingDots}</div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {!isPlannerMode && (
        <div className="chatbot-input">
          <input
            type="text"
            value={input}
            placeholder="Ask Roamy anything about your trip..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button onClick={handleSend}>Send</button>
          <button onClick={() => setIsPlannerMode(true)}>Plan Trip</button>
        </div>
      )}
    </div>
  );
};

export default ChatbotModal;
