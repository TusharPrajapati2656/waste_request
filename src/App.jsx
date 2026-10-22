// src/App.jsx

import { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Header from "./common/header/Header";
import Footer from "./common/Footer/Footer";
import Home from "./pages/home/Home";
import TrackRequests from "./pages/TrackRequests";
import Legal from "./pages/Legal";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname, hash]);

  return null;
}

const App = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <ScrollToTop />
      <Header />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Navigate to="/#about" replace />} />
          <Route path="/services" element={<Navigate to="/#services" replace />} />
          <Route path="/services/:category" element={<Navigate to="/#services" replace />} />
          <Route path="/contact" element={<Navigate to="/#contact" replace />} />
          <Route path="/faq" element={<Navigate to="/#faq" replace />} />
          <Route path="/my-requests" element={<TrackRequests />} />
          <Route path="/privacy-policy" element={<Legal type="privacy" />} />
          <Route path="/terms" element={<Legal type="terms" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;