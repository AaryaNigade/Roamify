import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginModal.css";

const LoginModal = ({ closeModal }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Normally you'd check credentials via API
    if (formData.email && formData.password) {
      localStorage.setItem("isLoggedIn", "true");
      alert("Login Successful!");
      closeModal();
      navigate("/explore");
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="login-modal">
        <button className="close-btn" onClick={closeModal}>×</button>
        <h2>Login to Continue</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
