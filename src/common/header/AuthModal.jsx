// src/components/Header/AuthModal.jsx

import { useEffect, useState } from "react";
import { FiX, FiMail, FiLock, FiUser } from "react-icons/fi";
import "./AuthModal.css";

export default function AuthModal({ isOpen, onClose }) {
  const [mode, setMode] = useState("login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const email = formData.email.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (mode === "signup" && !formData.name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    setError(
      "Authentication API is not connected yet. Please connect your backend."
    );
  };

  return (
    <div
      className="auth-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="auth-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-title"
      >
        <button
          className="auth-close"
          type="button"
          onClick={onClose}
          aria-label="Close authentication dialog"
        >
          <FiX />
        </button>

        <div className="auth-brand-mark" aria-hidden="true">
          <span>G</span>
        </div>

        <p className="auth-eyebrow">CLEANER COMMUNITIES START HERE</p>

        <h2 id="auth-title">
          {mode === "login" ? "Welcome back" : "Create your account"}
        </h2>

        <p className="auth-description">
          {mode === "login"
            ? "Sign in to manage your waste pickup requests."
            : "Join us to make waste collection easier."}
        </p>

        <div className="auth-tabs" aria-label="Authentication options">
          <button
            type="button"
            className={mode === "login" ? "active" : ""}
            onClick={() => {
              setMode("login");
              setError("");
            }}
          >
            Login
          </button>

          <button
            type="button"
            className={mode === "signup" ? "active" : ""}
            onClick={() => {
              setMode("signup");
              setError("");
            }}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {mode === "signup" && (
            <label className="auth-field">
              <span>Full name</span>
              <div className="auth-input-wrap">
                <FiUser aria-hidden="true" />
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </label>
          )}

          <label className="auth-field">
            <span>Email address</span>
            <div className="auth-input-wrap">
              <FiMail aria-hidden="true" />
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </label>

          <label className="auth-field">
            <span>Password</span>
            <div className="auth-input-wrap">
              <FiLock aria-hidden="true" />
              <input
                type="password"
                name="password"
                autoComplete={
                  mode === "login" ? "current-password" : "new-password"
                }
                placeholder="At least 8 characters"
                minLength={8}
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </label>

          {error && (
            <p className="auth-error" role="alert">
              {error}
            </p>
          )}

          <button className="auth-submit" type="submit">
            {mode === "login" ? "Login to your account" : "Create account"}
          </button>
        </form>

        <p className="auth-footer">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </section>
    </div>
  );
}