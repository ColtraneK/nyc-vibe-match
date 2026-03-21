import { createServerClient } from "@/lib/supabase";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import MetroCard from "@/components/MetroCard";
import NycMap from "@/components/NycMap";
import ResultsClient from "./ResultsClient";
import ResultsAccordion from "@/components/ResultsAccordion";
import { generateMatchReason } from "@/lib/match-reason";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const supabase = createServerClient();
  const { data } = await supabase
    .from("quiz_results")
    .select("matches")
    .eq("id", id)
    .single();

  const top = data?.matches?.[0];
  const title = top
    ? `My NYC match: ${top.n} (${top.score}%)`
    : "NYC Vibe Match Results";

  return {
    title,
    openGraph: {
      title,
      description: top ? top.tg : "Find your perfect NYC neighborhood.",
      images: [`${APP_URL}/api/og/${id}`],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: top ? top.tg : "Find your perfect NYC neighborhood.",
      images: [`${APP_URL}/api/og/${id}`],
    },
  };
}

export default async function ResultsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createServerClient();

  const { data } = await supabase
    .from("quiz_results")
    .select("id, matches, answers")
    .eq("id", id)
    .single();

  if (!data) notFound();

  const matches = data.matches;
  const top = matches[0];
  const matchReason = generateMatchReason(data.answers, top);
  const [reasonPara1, reasonPara2] = matchReason.split("\n\n");

  return (
    <div style={{ paddingTop: "16px", paddingBottom: "60px" }} className="animate-fade">
      {/* Header */}
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "10px",
          color: "var(--t3)",
          letterSpacing: ".15em",
          textTransform: "uppercase",
          textAlign: "center",
          marginBottom: "14px",
          padding: "0 16px",
        }}
      >
        YOUR NYC VIBE MATCH
      </div>

      {/* MetroCard */}
      <MetroCard match={top} rank={1} />

      {/* Vibe description - 3 paragraphs */}
      <div
        style={{
          margin: "0 16px 18px",
          padding: "18px 16px",
          borderRadius: "14px",
          fontSize: "14px",
          lineHeight: "1.7",
          color: "var(--t2)",
          background: `${top.c}10`,
          border: `1px solid ${top.c}30`,
          display: "flex",
          flexDirection: "column",
          gap: "14px",
        }}
      >
        <p style={{ margin: 0 }}>{top.vb}</p>
        <p style={{ margin: 0 }}>{reasonPara1}</p>
        {reasonPara2 && <p style={{ margin: 0 }}>{reasonPara2}</p>}
      </div>

      {/* Map */}
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "10px",
          color: "var(--t3)",
          letterSpacing: ".12em",
          textTransform: "uppercase",
          padding: "0 16px",
          marginBottom: "10px",
        }}
      >
        YOUR MAP
      </div>
      <NycMap matches={matches} />

      {/* Top 5 list */}
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "10px",
          color: "var(--t3)",
          letterSpacing: ".15em",
          textTransform: "uppercase",
          textAlign: "center",
          marginBottom: "14px",
          padding: "0 16px",
        }}
      >
        YOUR TOP 5
      </div>

      <ResultsAccordion matches={matches} />

      {/* Squad + Share CTA */}
      <ResultsClient resultId={id} topMatch={top} />
    </div>
  );
}
