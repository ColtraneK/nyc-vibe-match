import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import { createServerClient } from "@/lib/supabase";

export const runtime = "edge";

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

  const match = data?.matches?.[0];

  return new ImageResponse(
    (
      <div
        style={{
          background: "#131620",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          padding: "40px",
        }}
      >
        <div
          style={{
            fontSize: "12px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(245,242,235,0.4)",
            marginBottom: "16px",
          }}
        >
          NYC VIBE MATCH
        </div>

        <div
          style={{
            background: match?.c || "#E8A87C",
            borderRadius: "16px",
            padding: "0 0 20px",
            width: "360px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              background: match?.c || "#E8A87C",
              padding: "12px 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontWeight: 700,
                fontSize: "16px",
                background: "rgba(0,0,0,.2)",
                padding: "2px 8px",
                borderRadius: "4px",
                color: "#000",
              }}
            >
              {match?.ln || "NYC"}
            </span>
            <span style={{ fontSize: "10px", color: "rgba(0,0,0,.7)", fontWeight: 600 }}>
              METROCARD
            </span>
          </div>

          <div style={{ background: "#1A2030", padding: "20px", display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: "40px", fontWeight: 400, color: "#F5F2EB", lineHeight: 1.1 }}>
              {match?.n || "New York"}
            </div>
            <div style={{ fontSize: "12px", color: "rgba(245,242,235,0.4)", marginTop: "4px" }}>
              {match?.b || "NYC"}
            </div>
            <div
              style={{
                fontSize: "32px",
                fontWeight: 700,
                color: match?.c || "#E8A87C",
                marginTop: "12px",
              }}
            >
              {match?.score || 0}%{" "}
              <span style={{ fontSize: "14px", fontWeight: 400, color: "rgba(245,242,235,0.6)" }}>
                match
              </span>
            </div>
            <div
              style={{
                fontSize: "14px",
                color: "rgba(245,242,235,0.6)",
                fontStyle: "italic",
                marginTop: "8px",
              }}
            >
              {match?.tg || "Your NYC neighborhood"}
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: "20px",
            fontSize: "13px",
            color: "rgba(245,242,235,0.3)",
            letterSpacing: "0.1em",
          }}
        >
          nyc-vibe-match.aidgentic.com
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
