import Link from "next/link";

export default function LandingPage() {
  return (
    <div
      style={{
        minHeight: "calc(100vh - 28px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 24px",
        textAlign: "center",
      }}
      className="animate-fade"
    >
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "10px",
          color: "var(--t3)",
          letterSpacing: ".22em",
          textTransform: "uppercase",
          marginBottom: "18px",
        }}
      >
        NYC VIBE MATCH
      </div>

      <h1
        style={{
          fontFamily: "'Fraunces', serif",
          fontSize: "50px",
          lineHeight: "1.02",
          fontWeight: 400,
          textAlign: "center",
          marginBottom: "14px",
        }}
      >
        Find your
        <br />
        <em style={{ fontWeight: 300 }}>perfect</em>
        <br />
        neighborhood
      </h1>

      <p
        style={{
          fontFamily: "'Karla', sans-serif",
          fontSize: "15px",
          lineHeight: "1.6",
          color: "var(--t2)",
          textAlign: "center",
          maxWidth: "280px",
          marginBottom: "40px",
        }}
      >
        7 questions. Under a minute.
        <br />
        Backed by real city data.
      </p>

      <Link
        href="/start"
        style={{
          background: "var(--t1)",
          color: "var(--bg)",
          borderRadius: "100px",
          fontWeight: 600,
          fontSize: "16px",
          padding: "16px 44px",
          textDecoration: "none",
          display: "inline-block",
        }}
      >
        Get Started
      </Link>

      <div
        style={{
          marginTop: "48px",
          display: "flex",
          gap: "22px",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "10px",
          color: "var(--t3)",
          letterSpacing: ".08em",
          textTransform: "uppercase",
        }}
      >
        <span>55 HOODS</span>
        <span>·</span>
        <span>REAL DATA</span>
        <span>·</span>
        <span>SQUAD MODE</span>
      </div>
    </div>
  );
}
