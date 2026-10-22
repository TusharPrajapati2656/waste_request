// src/pages/admin/AdminLogin.jsx

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LuShieldCheck,
  LuMail,
  LuLock,
  LuArrowRight,
  LuZap,
  LuLeaf,
} from "react-icons/lu";
import { adminAuthStore } from "./services/adminAuthStore";
import { adminAuditStore } from "./services/adminAuditStore";

export default function AdminLogin({ onLoginSuccess }) {
  const [email, setEmail] = useState("admin@greencycle.eco");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      const res = adminAuthStore.login(email, password);
      setLoading(false);
      if (res.success) {
        adminAuditStore.log(
          "ADMIN_LOGIN",
          "SESSION",
          `Admin ${res.user.name} authenticated into Operations Depot console.`,
          res.user.name,
          "info"
        );
        onLoginSuccess(res.user);
      } else {
        setError(res.error);
      }
    }, 400);
  };

  const handleQuickDemo = () => {
    setLoading(true);
    setTimeout(() => {
      const user = adminAuthStore.quickDemoLogin();
      adminAuditStore.log(
        "ADMIN_DEMO_LOGIN",
        "SESSION",
        `Instant Demo Login activated for ${user.name}.`,
        user.name,
        "info"
      );
      setLoading(false);
      onLoginSuccess(user);
    }, 300);
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-glow" />
      <div className="admin-login-glow-bottom" />

      <div className="admin-login-card">
        {/* Header */}
        <div className="admin-login-header">
          <div className="admin-shield-icon" aria-hidden="true">
            <LuShieldCheck />
          </div>
          <h1 className="admin-login-title">GreenCycle Operations HQ</h1>
          <p className="admin-login-subtitle">
            Secure administrative console for regional depot management, dispatch telematics & fleet logistics.
          </p>
        </div>

        {/* Form */}
        <form className="admin-login-form" onSubmit={handleSubmit}>
          {error && (
            <div
              style={{
                background: "rgba(239, 68, 68, 0.15)",
                border: "0.1rem solid rgba(239, 68, 68, 0.4)",
                color: "#fca5a5",
                padding: "1rem 1.4rem",
                borderRadius: "var(--admin-radius-md)",
                fontSize: "1.3rem",
              }}
            >
              {error}
            </div>
          )}

          <div className="admin-input-group">
            <label className="admin-input-label" htmlFor="admin-email">
              Staff Email Address
            </label>
            <div className="admin-input-field-wrap">
              <LuMail className="admin-input-icon" aria-hidden="true" />
              <input
                id="admin-email"
                type="email"
                className="admin-login-input"
                placeholder="admin@greencycle.eco"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="admin-input-group">
            <label className="admin-input-label" htmlFor="admin-password">
              Security Passcode
            </label>
            <div className="admin-input-field-wrap">
              <LuLock className="admin-input-icon" aria-hidden="true" />
              <input
                id="admin-password"
                type="password"
                className="admin-login-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="admin-login-btn"
            disabled={loading}
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Access Operations Console</span>
                <LuArrowRight />
              </>
            )}
          </button>

          {/* Quick Demo Access */}
          <button
            type="button"
            className="admin-demo-quick-btn"
            onClick={handleQuickDemo}
            title="Instant 1-click login for test environment"
          >
            <LuZap />
            <span>Instant Demo Admin Login</span>
          </button>
        </form>

        {/* Footer links */}
        <div className="admin-login-footer-links">
          <span>Demo Pass: admin@greencycle.eco / admin123</span>
          <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
            <LuLeaf />
            <span>Citizen Site</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
