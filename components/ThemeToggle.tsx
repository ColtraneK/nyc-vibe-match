"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("nyc-theme") as "dark" | "light" | null;
    const initial = saved || "light";
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
    setMounted(true);
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("nyc-theme", next);
  }

  // Avoid flash of wrong icon on SSR
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        width: "56px",
        height: "30px",
        borderRadius: "100px",
        background: isDark ? "rgba(255,255,255,.10)" : "rgba(0,0,0,.08)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: `1px solid ${isDark ? "rgba(255,255,255,.12)" : "rgba(0,0,0,.10)"}`,
        padding: "3px",
        cursor: "pointer",
        transition: "all .3s ease",
        boxShadow: isDark
          ? "0 2px 12px rgba(0,0,0,.4)"
          : "0 2px 12px rgba(0,0,0,.1)",
      }}
    >
      <div
        style={{
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          background: isDark ? "#F5F2EB" : "#1A1A1A",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "13px",
          transform: isDark ? "translateX(0)" : "translateX(26px)",
          transition: "transform .3s ease, background .3s ease",
          boxShadow: "0 1px 4px rgba(0,0,0,.2)",
        }}
      >
        {isDark ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#131620" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FAF8F4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        )}
      </div>
    </button>
  );
}
