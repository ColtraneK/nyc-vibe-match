import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import { createServerClient } from "@/lib/supabase";

export const runtime = "edge";

function getMatchLabel(score: number): string {
  if (score >= 90) return "PERFECT FIT";
  if (score >= 80) return "STRONG MATCH";
  return "GOOD MATCH";
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = createServerClient();

  const { data } = await supabase
    .from("quiz_results")
    .select("matches")
    .eq("id", id)
    .single();

  const matches = data?.matches || [];
  const top = matches[0];
  const accent = top?.c || "#E8A87C";

  return new ImageResponse(
    (
      <div
        style={{
          background: "#0D1117",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top accent bar */}
        <div style={{ background: accent, height: "7px", width: "100%", display: "flex" }} />

        <div style={{ display: "flex", flex: 1 }}>

          {/* Left panel — hero */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "48px 56px 40px",
              flex: 1,
            }}
          >
            {/* App label */}
            <div
              style={{
                fontSize: "11px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)",
                display: "flex",
                marginBottom: "32px",
              }}
            >
              NYC VIBE MATCH
            </div>

            {/* Neighborhood name */}
            <div
              style={{
                fontSize: "68px",
                fontWeight: 800,
                color: "#FFFFFF",
                lineHeight: 1,
                display: "flex",
                marginBottom: "10px",
              }}
            >
              {top?.n || "New York"}
            </div>

            {/* Borough */}
            <div
              style={{
                fontSize: "15px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.4)",
                display: "flex",
                marginBottom: "28px",
              }}
            >
              {top?.b || "NYC"}
            </div>

            {/* Score + label row */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
              <div
                style={{
                  background: accent,
                  color: "#000",
                  fontSize: "13px",
                  fontWeight: 800,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "7px 18px",
                  borderRadius: "100px",
                  display: "flex",
                }}
              >
                {getMatchLabel(top?.score || 72)}
              </div>
              <div
                style={{
                  fontSize: "30px",
                  fontWeight: 700,
                  color: accent,
                  display: "flex",
                  alignItems: "baseline",
                  gap: "3px",
                }}
              >
                {top?.score || 0}
                <span style={{ fontSize: "16px", fontWeight: 400, color: "rgba(255,255,255,0.4)" }}>
                  %
                </span>
              </div>
            </div>

            {/* Tagline */}
            <div
              style={{
                fontSize: "16px",
                color: "rgba(255,255,255,0.5)",
                fontStyle: "italic",
                display: "flex",
                maxWidth: "420px",
                lineHeight: 1.5,
              }}
            >
              &ldquo;{top?.tg || "Find your NYC neighborhood"}&rdquo;
            </div>

            {/* URL — pinned to bottom */}
            <div
              style={{
                marginTop: "auto",
                fontSize: "12px",
                color: "rgba(255,255,255,0.18)",
                letterSpacing: "0.1em",
                display: "flex",
              }}
            >
              nyc-vibe-match.aidgentic.com
            </div>
          </div>

          {/* Right panel — top matches list */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "400px",
              padding: "48px 44px 40px 36px",
              borderLeft: "1px solid rgba(255,255,255,0.06)",
              justifyContent: "center",
              gap: "4px",
            }}
          >
            <div
              style={{
                fontSize: "10px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.25)",
                display: "flex",
                marginBottom: "20px",
              }}
            >
              YOUR TOP MATCHES
            </div>

            {matches.slice(0, 5).map((m: { n: string; b: string; score: number; c: string }, i: number) => {
              const isFirst = i === 0;
              const barWidth = Math.round((m.score / 95) * 100);
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px 0",
                    borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.05)" : "none",
                  }}
                >
                  {/* Rank badge */}
                  <div
                    style={{
                      width: "26px",
                      height: "26px",
                      borderRadius: "7px",
                      background: isFirst ? accent : "rgba(255,255,255,0.07)",
                      color: isFirst ? "#000" : "rgba(255,255,255,0.35)",
                      fontSize: "11px",
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {i + 1}
                  </div>

                  {/* Name + bar */}
                  <div style={{ display: "flex", flexDirection: "column", flex: 1, gap: "5px" }}>
                    <div
                      style={{
                        fontSize: isFirst ? "17px" : "15px",
                        fontWeight: isFirst ? 700 : 400,
                        color: isFirst ? "#fff" : "rgba(255,255,255,0.5)",
                        display: "flex",
                      }}
                    >
                      {m.n}
                    </div>
                    <div
                      style={{
                        height: "3px",
                        background: "rgba(255,255,255,0.08)",
                        borderRadius: "2px",
                        display: "flex",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${barWidth}%`,
                          height: "100%",
                          background: isFirst ? accent : "rgba(255,255,255,0.2)",
                          borderRadius: "2px",
                          display: "flex",
                        }}
                      />
                    </div>
                  </div>

                  {/* Score */}
                  <div
                    style={{
                      fontFamily: "monospace",
                      fontSize: "14px",
                      fontWeight: 700,
                      color: isFirst ? accent : "rgba(255,255,255,0.3)",
                      display: "flex",
                      flexShrink: 0,
                    }}
                  >
                    {m.score}%
                  </div>
                </div>
              );
            })}

            {/* CTA */}
            <div
              style={{
                marginTop: "24px",
                fontSize: "13px",
                color: "rgba(255,255,255,0.25)",
                display: "flex",
                letterSpacing: "0.04em",
              }}
            >
              Take the quiz →
            </div>
          </div>

        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
