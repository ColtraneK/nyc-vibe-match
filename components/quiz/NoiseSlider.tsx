"use client";

import { useState } from "react";

const LABELS = ["Love it", "Part of the charm", "Neutral", "Rather not", "Silence or nothing"];
const REACTIONS = [
  "City lullaby",
  "You sleep through sirens",
  "Adaptable",
  "Earplugs ready",
  "You need your peace",
];

interface Props {
  onNext: (value: number) => void;
}

export default function NoiseSlider({ onNext }: Props) {
  const [val, setVal] = useState(2);

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
        max={4}
        step={1}
        value={val}
        onChange={(e) => setVal(Number(e.target.value))}
      />

      <div
        style={{
          textAlign: "center",
          marginTop: "14px",
          fontWeight: 500,
          fontSize: "15px",
          color: "var(--t1)",
        }}
      >
        {REACTIONS[val]}
      </div>
      <div
        style={{
          textAlign: "center",
          marginTop: "8px",
          fontFamily: "'JetBrains Mono', monospace",
          fontWeight: 700,
          fontSize: "18px",
          color: "var(--c2)",
        }}
      >
        {LABELS[val]}
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: "28px" }}>
        <button
          onClick={() => onNext(val)}
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
