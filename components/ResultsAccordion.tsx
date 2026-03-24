"use client";

import { useState } from "react";

interface Match {
  id: string;
  n: string;
  b: string;
  ln: string;
  c: string;
  tg: string;
  vb: string;
  score: number;
  quiet: number;
  food: number;
  nl: number;
  green: number;
  safe: number;
  val: number;
  transit: number;
}

const DIMS = [
  { key: "quiet" as const, label: "QUIET" },
  { key: "food" as const, label: "FOOD" },
  { key: "nl" as const, label: "NIGHT" },
  { key: "green" as const, label: "GREEN" },
  { key: "safe" as const, label: "SAFE" },
  { key: "val" as const, label: "VALUE" },
];

function AccordionItem({ match, rank, isTop }: { match: Match; rank: number; isTop: boolean }) {
  const [open, setOpen] = useState(isTop);

  return (
    <div
      style={{
        borderRadius: "14px",
        background: isTop ? "var(--s1)" : "var(--s0)",
        border: `1px solid ${isTop ? "var(--b2)" : "var(--b1)"}`,
        marginBottom: "8px",
        overflow: "hidden",
        transition: "border-color .2s",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
      }}
    >
      {/* Header row - always visible */}
      <div
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "14px 16px",
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        <div
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "8px",
            background: match.c,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 700,
            fontSize: "12px",
            color: "#000",
            flexShrink: 0,
          }}
        >
          {rank}
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: "18px", lineHeight: "1.1" }}>
            {match.n}
          </div>
          <div
            style={{
              fontSize: "10px",
              color: "var(--t3)",
              textTransform: "uppercase",
              letterSpacing: ".04em",
              marginTop: "1px",
            }}
          >
            {match.b} - {match.ln}
          </div>
        </div>

        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 700,
            fontSize: "18px",
            color: match.c,
          }}
        >
          {match.score}%
        </div>

        <div
          style={{
            color: "var(--t3)",
            fontSize: "12px",
            transition: "transform .25s",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            flexShrink: 0,
          }}
        >
          ▾
        </div>
      </div>

      {/* Expandable body */}
      <div
        style={{
          maxHeight: open ? "500px" : "0px",
          overflow: "hidden",
          transition: "max-height .3s cubic-bezier(.22,1,.36,1)",
        }}
      >
        <div style={{ padding: "0 16px 16px" }}>
          {/* Tagline */}
          <div
            style={{
              fontSize: "13px",
              color: "var(--t2)",
              fontStyle: "italic",
              marginBottom: "10px",
            }}
          >
            {match.tg}
          </div>

          {/* Dim bars */}
          {DIMS.map(({ key, label }) => (
            <div
              key={key}
              style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "4px" }}
            >
              <span
                style={{
                  width: "44px",
                  textAlign: "right",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "9px",
                  color: "var(--t3)",
                  letterSpacing: ".04em",
                  textTransform: "uppercase",
                }}
              >
                {label}
              </span>
              <div
                style={{
                  flex: 1,
                  height: "3px",
                  background: "var(--s2)",
                  borderRadius: "2px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${match[key] * 10}%`,
                    height: "100%",
                    background: match.c,
                    borderRadius: "2px",
                    transition: open ? "width .6s cubic-bezier(.22,1,.36,1) .1s" : "none",
                  }}
                />
              </div>
              <span
                style={{
                  width: "16px",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 700,
                  fontSize: "10px",
                  color: "var(--t2)",
                }}
              >
                {match[key]}
              </span>
            </div>
          ))}

          {/* Vibe blurb */}
          <div
            style={{
              fontSize: "13px",
              lineHeight: "1.5",
              color: "var(--t3)",
              marginTop: "10px",
            }}
          >
            {match.vb}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResultsAccordion({ matches }: { matches: Match[] }) {
  return (
    <div style={{ padding: "0 16px" }}>
      {matches.map((m, i) => (
        <AccordionItem key={m.id} match={m} rank={i + 1} isTop={i === 0} />
      ))}
    </div>
  );
}
