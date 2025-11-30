import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/lists");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Shopping List App</h1>
        <p className="login-subtitle">
          Welcome back! You&apos;re logged in as <strong>Julie</strong>.
        </p>
        <button className="login-btn" onClick={handleContinue}>
          Continue to lists
        </button>
      </div>
    </div>
  );
};

export default LoginPage;