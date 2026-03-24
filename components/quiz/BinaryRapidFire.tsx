"use client";

import { useState } from "react";

interface Pair {
  a: string;
  b: string;
  aw: Record<string, number>;
  bw: Record<string, number>;
}

interface Props {
  pairs: Pair[];
  onDone: (weights: Array<Record<string, number>>) => void;
}

export default function BinaryRapidFire({ pairs, onDone }: Props) {
  const [current, setCurrent] = useState(0);
  const [accumulated, setAccumulated] = useState<Array<Record<string, number>>>([]);
  const [fading, setFading] = useState(false);

  function pick(w: Record<string, number>) {
    const next = [...accumulated, w];
    setFading(true);
    setTimeout(() => {
      setAccumulated(next);
      if (current + 1 >= pairs.length) {
        onDone(next);
      } else {
        setCurrent((c) => c + 1);
        setFading(false);
      }
    }, 200);
  }

  const pair = pairs[current];

  return (
    <div style={{ padding: "0 24px" }}>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "10px",
          color: "var(--t3)",
          marginBottom: "16px",
          letterSpacing: ".1em",
        }}
      >
        {current + 1} of {pairs.length}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          opacity: fading ? 0 : 1,
          transform: fading ? "translateY(10px)" : "none",
          transition: "all .2s",
        }}
      >
        <button
          className="frost-box"
          onClick={() => pick(pair.aw)}
          style={{
            flex: 1,
            padding: "28px 16px",
            borderRadius: "16px",
            background: "var(--s0)",
            border: "1.5px solid var(--b1)",
            color: "var(--t1)",
            fontWeight: 600,
            fontSize: "15px",
            textAlign: "center",
            transition: "all .15s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "var(--s1)";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--b2)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "var(--s0)";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--b1)";
          }}
        >
          {pair.a}
        </button>

        <span
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: "16px",
            color: "var(--t3)",
            fontStyle: "italic",
            flexShrink: 0,
          }}
        >
          or
        </span>

        <button
          className="frost-box"
          onClick={() => pick(pair.bw)}
          style={{
            flex: 1,
            padding: "28px 16px",
            borderRadius: "16px",
            background: "var(--s0)",
            border: "1.5px solid var(--b1)",
            color: "var(--t1)",
            fontWeight: 600,
            fontSize: "15px",
            textAlign: "center",
            transition: "all .15s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "var(--s1)";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--b2)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "var(--s0)";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--b1)";
          }}
        >
          {pair.b}
        </button>
      </div>
    </div>
  );
}
