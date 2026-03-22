"use client";

import { useState } from "react";

const LABELS = ["$1,000", "$1,500", "$2,000", "$2,500", "$3,000", "$3,500", "$4,000", "$4,500", "$5,000", "$5,500", "$6,000+"];

interface Props {
  onNext: (value: number) => void;
}

// Map 0-10 slider to 0-4 budget tier for scoring
function toBudgetTier(sliderVal: number): number {
  if (sliderVal <= 1) return 0;  // $1,000-$1,500
  if (sliderVal <= 3) return 1;  // $2,000-$2,500
  if (sliderVal <= 5) return 2;  // $3,000-$3,500
  if (sliderVal <= 7) return 3;  // $4,000-$4,500
  return 4;                       // $5,000+
}

export default function BudgetSlider({ onNext }: Props) {
  const [val, setVal] = useState(4);

  return (
    <div style={{ padding: "0 24px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "12px",
          color: "var(--t3)",
          marginBottom: "8px",
        }}
      >
        <span>{LABELS[0]}</span>
        <span>{LABELS[LABELS.length - 1]}</span>
      </div>

      <input
        type="range"
        min={0}
        max={10}
        step={1}
        value={val}
        onChange={(e) => setVal(Number(e.target.value))}
      />

      <div
        style={{
          textAlign: "center",
          marginTop: "14px",
          fontFamily: "'JetBrains Mono', monospace",
          fontWeight: 700,
          fontSize: "22px",
          color: "var(--c6)",
        }}
      >
        {LABELS[val]}
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: "28px" }}>
        <button
          onClick={() => onNext(toBudgetTier(val))}
          style={{
            background: "var(--t1)",
            color: "var(--bg)",
            borderRadius: "100px",
            fontWeight: 600,
            fontSize: "14px",
            padding: "13px 32px",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
