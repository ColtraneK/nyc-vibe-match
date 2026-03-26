"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { matchLabel } from "@/lib/scoring";

interface Props {
  resultId: string;
  topMatch: { n: string; score: number; c: string };
  userId: string;
}

export default function ResultsClient({ resultId, topMatch, userId }: Props) {
  const router = useRouter();
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "";
  const shareUrl = `${APP_URL}/results/${resultId}`;

  async function createSquad() {
    setCreating(true);
    setError(null);

    try {
      const res = await fetch("/api/squads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, resultId }),
      });
      if (!res.ok) throw new Error("Failed to create squad");
      const { code } = await res.json();
      router.push(`/squad/${code}`);
    } catch {
      setError("Couldn't create squad. Try again.");
      setCreating(false);
    }
  }

  async function copyLink() {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function nativeShare() {
    if (navigator.share) {
      await navigator.share({
        title: `I matched with ${topMatch.n} — ${matchLabel(topMatch.score)} | NYC Vibe Match`,
        url: shareUrl,
      });
    } else {
      copyLink();
    }
  }

  return (
    <>
      {/* Squad CTA */}
      <div
        style={{
          margin: "28px 16px 0",
          padding: "24px 20px",
          borderRadius: "16px",
          background: "var(--s1)",
          border: "1px solid var(--b2)",
          textAlign: "center",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
        }}
      >
        <div style={{ fontSize: "28px", marginBottom: "6px" }}>👥</div>
        <div
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: "18px",
            marginBottom: "4px",
          }}
        >
          See where your squad lands
        </div>
        <p
          style={{
            fontSize: "13px",
            lineHeight: "1.5",
            color: "var(--t2)",
            marginBottom: "14px",
          }}
        >
          Create a squad link, share with friends, and compare neighborhoods on the map.
        </p>
        <button
          onClick={createSquad}
          disabled={creating}
          style={{
            background: "var(--t1)",
            color: "var(--bg)",
            borderRadius: "100px",
            fontWeight: 600,
            fontSize: "14px",
            padding: "13px 28px",
            opacity: creating ? 0.7 : 1,
            cursor: creating ? "not-allowed" : "pointer",
          }}
        >
          {creating ? "Creating..." : "Create a Squad"}
        </button>
        {error && (
          <p style={{ color: "#E86A6A", fontSize: "13px", marginTop: "10px" }}>{error}</p>
        )}
      </div>

      {/* Share buttons */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          padding: "16px 16px 0",
          justifyContent: "center",
        }}
      >
        <button
          onClick={copyLink}
          style={{
            background: "transparent",
            color: "var(--t2)",
            border: "1px solid var(--b2)",
            borderRadius: "100px",
            padding: "10px 20px",
            fontSize: "13px",
            fontWeight: 500,
          }}
        >
          {copied ? "Copied!" : "Copy link"}
        </button>
        <button
          onClick={nativeShare}
          style={{
            background: "transparent",
            color: "var(--t2)",
            border: "1px solid var(--b2)",
            borderRadius: "100px",
            padding: "10px 20px",
            fontSize: "13px",
            fontWeight: 500,
          }}
        >
          Share
        </button>
      </div>

      {/* Retake */}
      <div style={{ textAlign: "center", marginTop: "16px" }}>
        <a
          href="/start"
          style={{
            background: "none",
            border: "none",
            color: "var(--t3)",
            fontSize: "14px",
            textDecoration: "underline",
            textUnderlineOffset: "4px",
            cursor: "pointer",
          }}
        >
          Retake quiz
        </a>
      </div>
    </>
  );
}
