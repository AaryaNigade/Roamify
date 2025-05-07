import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Explore from "./components/Explore";
import DestinationDetails from "./components/DestinationDetails";
import ChatbotButton from "./components/ChatbotButton";
import ChatbotModal from "./components/ChatbotModal";
import "./App.css";

function App() {
  const [showChatbot, setShowChatbot] = useState(false);
  const [user, setUser] = useState(null);

  const toggleChatbot = () => {
    console.log("Toggling Chatbot...");
    setShowChatbot(!showChatbot);
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      if (loggedInUser && loggedInUser !== "undefined") {
        try {
          setUser(JSON.parse(loggedInUser));
        } catch (error) {
          console.error("Error parsing user from localStorage:", error);
          localStorage.removeItem("user");
        }
      }
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home toggleChatbot={toggleChatbot} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/destination/:name" element={<DestinationDetails />} />
        </Routes>
        <ChatbotButton toggleChatbot={toggleChatbot} />
        {showChatbot && <ChatbotModal toggleChatbot={toggleChatbot} />}
      </div>
    </Router>
  );
}

export default App;
