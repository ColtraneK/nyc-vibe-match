"use client";

import { useEffect, useState } from "react";
import { ScoredNeighborhood, matchLabel } from "@/lib/scoring";

interface Props {
  match: ScoredNeighborhood;
  rank?: number;
}

const DIMS = [
  { key: "quiet", label: "QUIET" },
  { key: "food", label: "FOOD" },
  { key: "nl", label: "NIGHT" },
  { key: "green", label: "GREEN" },
  { key: "safe", label: "SAFE" },
  { key: "val", label: "VALUE" },
  { key: "transit", label: "TRNST" },
] as const;

function dimColor(val: number, color: string): string {
  if (val >= 8) return color;
  if (val >= 5) return `${color}99`;
  return `${color}55`;
}

function useCountUp(target: number, duration = 1200) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(eased * target));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);
  return val;
}

export default function MetroCard({ match, rank }: Props) {
  const displayScore = useCountUp(match.score);

  const now = new Date();
  const timestamp = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const dateStr = now.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).toUpperCase();

  return (
    <div
      style={{
        borderRadius: "16px",
        overflow: "hidden",
        background: "var(--card)",
        border: "1px solid var(--b2)",
        margin: "0 16px 16px",
      }}
    >
      {/* Top strip */}
      <div
        style={{
          background: match.c,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "9px 16px",
          fontFamily: "'JetBrains Mono', monospace",
        }}
      >
        <span
          style={{
            fontWeight: 700,
            fontSize: "15px",
            background: "rgba(0,0,0,.2)",
            padding: "2px 8px",
            borderRadius: "4px",
            color: "#000",
          }}
        >
          {match.ln}
        </span>
        <span
          style={{
            fontSize: "9px",
            letterSpacing: ".15em",
            textTransform: "uppercase",
            fontWeight: 600,
            color: "rgba(0,0,0,.7)",
          }}
        >
          METROCARD
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: "18px 16px 14px" }}>
        <div
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: "34px",
            fontWeight: 400,
            lineHeight: 1,
            marginBottom: "2px",
            color: "var(--t1)",
          }}
        >
          {match.n}
        </div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "11px",
            color: "var(--t3)",
            letterSpacing: ".08em",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}
        >
          {match.b}
        </div>

        {/* Score row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: "2px" }}>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700,
                fontSize: "28px",
                color: match.c,
              }}
            >
              {displayScore}
            </span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "13px",
                fontWeight: 400,
                color: "var(--t2)",
              }}
            >
              %
            </span>
          </div>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: ".06em",
              textTransform: "uppercase",
              background: `${match.c}22`,
              color: match.c,
              padding: "4px 10px",
              borderRadius: "100px",
              border: `1px solid ${match.c}50`,
            }}
          >
            {rank === 1 ? "Your perfect match" : matchLabel(match.score)}
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontFamily: "'Karla', sans-serif",
            fontSize: "14px",
            lineHeight: "1.5",
            color: "var(--t2)",
            fontStyle: "italic",
            marginBottom: "14px",
            paddingBottom: "12px",
            borderBottom: "1px solid var(--b1)",
          }}
        >
          {match.tg}
        </div>

        {/* Dimension bars */}
        <div style={{ display: "flex", gap: "4px", marginBottom: "12px" }}>
          {DIMS.map(({ key, label }) => {
            const val = match[key] as number;
            return (
              <div
                key={key}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "2px",
                  flex: 1,
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "34px",
                    background: "var(--s1)",
                    borderRadius: "3px",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: `${val * 10}%`,
                      background: dimColor(val, match.c),
                      borderRadius: "3px",
                    }}
                  />
                </div>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 700,
                    fontSize: "10px",
                    color: "var(--t2)",
                  }}
                >
                  {val}
                </span>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "7px",
                    color: "var(--t3)",
                    letterSpacing: ".06em",
                    textTransform: "uppercase",
                  }}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Subway lines */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            fontSize: "11px",
            color: "var(--t3)",
            marginBottom: "8px",
          }}
        >
          {match.ln.split("/").map((line) => (
            <span
              key={line}
              style={{
                background: match.c,
                color: "#000",
                borderRadius: "50%",
                width: "20px",
                height: "20px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700,
                fontSize: "10px",
              }}
            >
              {line}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom strip */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "8px 16px",
          background: "var(--s0)",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "10px",
          color: "var(--t3)",
          letterSpacing: ".06em",
        }}
      >
        <span>NYC VIBE MATCH</span>
        <span>
          {dateStr} {timestamp}
        </span>
      </div>
    </div>
  );
}
