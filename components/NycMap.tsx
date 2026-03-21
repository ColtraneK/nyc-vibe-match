"use client";

import { useState } from "react";
import { NEIGHBORHOODS } from "@/lib/neighborhoods";
import { ScoredNeighborhood } from "@/lib/scoring";

interface SquadPin {
  avatar: string;
  match: ScoredNeighborhood;
}

interface Props {
  matches: ScoredNeighborhood[];
  squadPins?: SquadPin[];
}

const BORO_PATHS = {
  manhattan:
    "M365,20 L380,15 L410,30 L430,80 L445,150 L455,220 L460,300 L455,350 L445,380 L430,395 L410,385 L395,360 L385,310 L375,250 L365,180 L355,110 L350,60 Z",
  brooklyn:
    "M430,395 L460,385 L500,370 L535,355 L570,365 L600,390 L610,430 L600,480 L580,520 L550,555 L500,570 L450,560 L415,540 L400,510 L405,470 L420,430 Z",
  queens:
    "M460,140 L500,130 L550,140 L610,165 L680,185 L740,210 L750,260 L740,310 L700,340 L650,360 L610,370 L575,365 L540,355 L510,340 L490,310 L475,270 L465,230 L460,185 Z",
  bronx:
    "M355,15 L385,5 L430,5 L470,15 L500,35 L510,70 L500,110 L480,135 L460,145 L435,150 L415,135 L395,110 L380,75 L365,40 Z",
  statenisland: "M280,470 L320,440 L360,455 L370,490 L360,530 L330,555 L295,555 L270,530 L265,500 Z",
};

const BORO_LABELS = [
  { t: "Manhattan", x: 400, y: 210 },
  { t: "Brooklyn", x: 510, y: 490 },
  { t: "Queens", x: 645, y: 260 },
  { t: "Bronx", x: 440, y: 50 },
  { t: "Staten Isl.", x: 315, y: 510 },
];

export default function NycMap({ matches, squadPins }: Props) {
  const [tooltip, setTooltip] = useState<{
    name: string;
    boro: string;
    ln: string;
    score: number;
    color: string;
    px: number;
    py: number;
  } | null>(null);

  const matchMap = new Map(matches.map((m, i) => [m.id, { ...m, rank: i + 1 }]));

  const glowRadii = [55, 42, 35, 28, 24];

  return (
    <div
      style={{
        position: "relative",
        width: "calc(100% - 24px)",
        margin: "0 12px 20px",
        borderRadius: "16px",
        background: "#151B28",
        border: "1px solid rgba(255,255,255,.1)",
        overflow: "hidden",
      }}
    >
      <svg viewBox="240 -20 560 600" width="100%" style={{ display: "block" }}>
        <defs>
          {matches.map((m, i) => (
            <radialGradient key={m.id} id={`glow-${m.id}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={m.c} stopOpacity={i === 0 ? 0.55 : 0.3} />
              <stop offset="100%" stopColor={m.c} stopOpacity={0} />
            </radialGradient>
          ))}
        </defs>

        {/* Water */}
        <rect x="240" y="-20" width="560" height="600" fill="#161D2B" />

        {/* Borough shapes */}
        {Object.entries(BORO_PATHS).map(([name, d]) => (
          <path
            key={name}
            d={d}
            fill="rgba(245,242,235,0.06)"
            stroke="rgba(245,242,235,0.14)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        ))}

        {/* Borough labels */}
        {BORO_LABELS.map((l) => (
          <text
            key={l.t}
            x={l.x}
            y={l.y}
            fill="rgba(245,242,235,0.18)"
            fontSize="13"
            fontFamily="'JetBrains Mono', monospace"
            textAnchor="middle"
            letterSpacing="0.1em"
            style={{ textTransform: "uppercase", pointerEvents: "none" }}
          >
            {l.t}
          </text>
        ))}

        {/* Glows */}
        {matches.map((m, i) => (
          <circle
            key={`glow-${m.id}`}
            cx={m.x}
            cy={m.y}
            r={glowRadii[i] || 24}
            fill={`url(#glow-${m.id})`}
          />
        ))}

        {/* All hood dots */}
        {NEIGHBORHOODS.map((h) => {
          const match = matchMap.get(h.id);
          const rank = match?.rank;
          const circleR = rank ? ([13, 10, 8, 7, 6][rank - 1] || 5) : 4;

          return (
            <g
              key={h.id}
              style={{ cursor: match ? "pointer" : "default" }}
              onPointerEnter={(e) => {
                if (!match) return;
                const svgEl = e.currentTarget.closest("svg")!;
                const rect = svgEl.getBoundingClientRect();
                const scaleX = rect.width / 560;
                const px = (h.x - 240) * scaleX;
                const py = (h.y + 20) * scaleX;
                setTooltip({
                  name: h.n,
                  boro: h.b,
                  ln: h.ln,
                  score: match.score,
                  color: h.c,
                  px,
                  py,
                });
              }}
              onPointerLeave={() => setTooltip(null)}
            >
              <circle
                cx={h.x}
                cy={h.y}
                r={circleR}
                fill={rank ? h.c : "rgba(245,242,235,0.18)"}
                stroke={rank === 1 ? "#fff" : "none"}
                strokeWidth={rank === 1 ? "2.5" : "0"}
              />
              {rank && (
                <>
                  <text
                    x={h.x}
                    y={h.y + (rank <= 2 ? 1 : 0.5)}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={rank <= 2 ? "#000" : "#fff"}
                    fontSize={rank === 1 ? "11" : "8"}
                    fontWeight="700"
                    fontFamily="'JetBrains Mono', monospace"
                    style={{ pointerEvents: "none" }}
                  >
                    {rank}
                  </text>
                  <text
                    x={h.x + (rank === 1 ? 17 : 13)}
                    y={h.y + 1}
                    textAnchor="start"
                    dominantBaseline="central"
                    fill="var(--t1)"
                    fontSize={rank === 1 ? "12" : "10"}
                    fontWeight={rank <= 2 ? "600" : "400"}
                    fontFamily="'Karla', sans-serif"
                    opacity={rank <= 3 ? 1 : 0.65}
                    style={{ pointerEvents: "none" }}
                  >
                    {h.n}
                  </text>
                </>
              )}
            </g>
          );
        })}

        {/* Squad pins */}
        {squadPins?.map((m, i) => {
          const h = NEIGHBORHOODS.find((hh) => hh.id === m.match.id);
          if (!h) return null;
          const off = i * 14 - (squadPins.length - 1) * 7;
          return (
            <g key={i}>
              <line
                x1={h.x + off}
                y1={h.y - 9}
                x2={h.x}
                y2={h.y}
                stroke={m.match.c}
                strokeWidth="1.5"
                opacity="0.35"
              />
              <circle
                cx={h.x + off}
                cy={h.y - 22}
                r="13"
                fill={m.match.c}
                stroke="var(--bg)"
                strokeWidth="2.5"
              />
              <text
                x={h.x + off}
                y={h.y - 21}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="13"
                style={{ pointerEvents: "none" }}
              >
                {m.avatar}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      {tooltip && (
        <div
          style={{
            position: "absolute",
            background: "#1E2235",
            border: "1px solid var(--b2)",
            borderRadius: "10px",
            padding: "10px 14px",
            pointerEvents: "none",
            zIndex: 10,
            minWidth: "140px",
            boxShadow: "0 8px 24px rgba(0,0,0,.4)",
            left: `${Math.min(Math.max(tooltip.px - 60, 0), 280)}px`,
            top: `${Math.max(tooltip.py - 70, 0)}px`,
          }}
        >
          <div style={{ fontWeight: 600, fontSize: "14px", color: tooltip.color }}>
            {tooltip.name}
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px",
              color: "var(--t3)",
              textTransform: "uppercase",
              letterSpacing: ".06em",
              marginTop: "1px",
            }}
          >
            {tooltip.boro} - {tooltip.ln}
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 700,
              fontSize: "16px",
              marginTop: "6px",
              color: tooltip.color,
            }}
          >
            {tooltip.score}% match
          </div>
        </div>
      )}
    </div>
  );
}
