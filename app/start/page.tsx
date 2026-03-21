"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function StartForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const squadCode = searchParams.get("squad");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) {
      setError("Enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Failed to save email");
      const { id } = await res.json();
      sessionStorage.setItem("userId", id);
      sessionStorage.setItem("userEmail", email);
      if (squadCode) sessionStorage.setItem("squadCode", squadCode);
      router.push("/quiz");
    } catch {
      setError("Something went wrong. Try again.");
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "calc(100vh - 28px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 24px",
      }}
      className="animate-fade"
    >
      <div style={{ fontSize: "48px", marginBottom: "20px" }}>📬</div>
      <h2
        style={{
          fontFamily: "'Fraunces', serif",
          fontSize: "28px",
          fontWeight: 400,
          marginBottom: "8px",
          textAlign: "center",
        }}
      >
        Where do we send your results?
      </h2>
      <p
        style={{
          fontSize: "14px",
          color: "var(--t2)",
          marginBottom: "32px",
          textAlign: "center",
        }}
      >
        We'll email you a link so you can share and revisit.
      </p>

      {squadCode && (
        <div
          style={{
            background: "rgba(133,205,202,.08)",
            border: "1px solid rgba(133,205,202,.2)",
            borderRadius: "10px",
            padding: "10px 16px",
            marginBottom: "20px",
            fontSize: "13px",
            color: "var(--c2)",
            textAlign: "center",
          }}
        >
          You're joining a squad - take the quiz first!
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "360px" }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          style={{
            width: "100%",
            background: "var(--s1)",
            border: "1.5px solid var(--b2)",
            borderRadius: "12px",
            padding: "14px 18px",
            fontSize: "16px",
            color: "var(--t1)",
            marginBottom: "12px",
            outline: "none",
          }}
          autoComplete="email"
          autoFocus
        />
        {error && (
          <p style={{ color: "#E86A6A", fontSize: "13px", marginBottom: "10px" }}>{error}</p>
        )}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            background: "var(--t1)",
            color: "var(--bg)",
            borderRadius: "100px",
            fontWeight: 600,
            fontSize: "15px",
            padding: "14px",
            opacity: loading ? 0.7 : 1,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Saving..." : "Start Quiz"}
        </button>
      </form>
    </div>
  );
}

export default function StartPage() {
  return (
    <Suspense>
      <StartForm />
    </Suspense>
  );
}
