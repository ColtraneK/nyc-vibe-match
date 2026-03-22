"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ScenarioPick from "@/components/quiz/ScenarioPick";
import BudgetSlider from "@/components/quiz/BudgetSlider";
import BinaryRapidFire from "@/components/quiz/BinaryRapidFire";
import DragToRank from "@/components/DragToRank";
import NoiseSlider from "@/components/quiz/NoiseSlider";
import VibeGrid from "@/components/quiz/VibeGrid";
import { scoreAll, QuizAnswers } from "@/lib/scoring";

const QUESTIONS = [
  {
    id: "friday",
    type: "scenario",
    meta: "Q1 OF 7",
    q: "11pm Friday. Plans fell through.",
    opts: [
      { label: "Perfect. Candle, album, done.", val: "home", icon: "🕯️", w: { quiet: 4, nl: -3 } },
      { label: "Group chat activated. Going out.", val: "out", icon: "📱", w: { nl: 4, quiet: -3 } },
      { label: "Headphones. Walk. See where I end up.", val: "walk", icon: "🎧", w: { green: 3, quiet: 1 } },
      { label: "Find a late-night spot with good food.", val: "eat", icon: "🍜", w: { food: 4, nl: 2 } },
    ],
  },
  {
    id: "budget",
    type: "slider",
    meta: "Q2 OF 7",
    q: "Apartment just dropped. Monthly rent:",
  },
  {
    id: "binary",
    type: "binary",
    meta: "Q3 OF 7",
    q: "Quick: this or that?",
    pairs: [
      { a: "Quiet streets", b: "Busy streets", aw: { quiet: 4, nl: -2 }, bw: { nl: 3, quiet: -3 } },
      { a: "Cheap + authentic", b: "Trendy + new", aw: { val: 3, food: 3 }, bw: { nl: 2, food: 1 } },
      { a: "Close to everything", b: "Worth the commute", aw: { transit: 4 }, bw: { val: 3, green: 2 } },
      { a: "Safe at 2am", b: "Character over comfort", aw: { safe: 4, quiet: 2 }, bw: { nl: 2, food: 1, val: 1 } },
    ],
  },
  {
    id: "rank",
    type: "rank",
    meta: "Q4 OF 7",
    q: "Drag to rank. #1 = must-have.",
    items: [
      { label: "Great food scene", icon: "🍕", key: "food" },
      { label: "Green space nearby", icon: "🌳", key: "green" },
      { label: "Nightlife + bars", icon: "🌙", key: "nl" },
      { label: "Safe at 2am", icon: "🛡️", key: "safe" },
      { label: "Bang for my buck", icon: "💰", key: "val" },
    ],
  },
  {
    id: "sunday",
    type: "scenario",
    meta: "Q5 OF 7",
    q: "Your ideal Sunday:",
    opts: [
      { label: "Farmers market, then cook something ambitious", val: "cook", icon: "🥬", w: { food: 2, green: 3, quiet: 3 } },
      { label: "Brunch that becomes drinks that becomes dinner", val: "marathon", icon: "🥂", w: { nl: 3, food: 2 } },
      { label: "Long run, then absolutely nothing", val: "run", icon: "🏃", w: { green: 4, quiet: 3, safe: 1 } },
      { label: "Explore somewhere I've never been", val: "explore", icon: "🗺️", w: { food: 2, transit: 2, val: 1 } },
    ],
  },
  {
    id: "noise",
    type: "slider",
    meta: "Q6 OF 7",
    q: "Street noise at midnight:",
  },
  {
    id: "vibe",
    type: "grid",
    meta: "Q7 OF 7",
    q: "Pick the window you wake up to:",
    cells: [
      { label: "Brownstone stoops", icon: "🏡", val: "brown", w: { quiet: 4, safe: 3, green: 1 } },
      { label: "City skyline", icon: "🏙️", val: "sky", w: { transit: 3, nl: 1 } },
      { label: "Buzzing street", icon: "⚡", val: "buzz", w: { food: 3, nl: 3, quiet: -4 } },
      { label: "Trees everywhere", icon: "🌳", val: "tree", w: { green: 5, quiet: 3, safe: 1 } },
    ],
  },
];

export default function QuizPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [userId, setUserId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const id = sessionStorage.getItem("userId");
    if (!id) {
      router.replace("/start");
    } else {
      setUserId(id);
    }
  }, [router]);

  async function finishQuiz(finalAnswers: QuizAnswers) {
    setSubmitting(true);
    const matches = scoreAll(finalAnswers);
    const email = sessionStorage.getItem("userEmail");
    const squadCode = sessionStorage.getItem("squadCode");

    try {
      const res = await fetch("/api/quiz-results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, answers: finalAnswers, matches }),
      });
      const { id: resultId } = await res.json();
      sessionStorage.setItem("lastResultId", resultId);

      // Send email
      if (email) {
        await fetch("/api/send-results", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, resultId, topMatch: matches[0], answers: finalAnswers, allMatches: matches }),
        });
      }

      // Join squad if applicable
      if (squadCode) {
        await fetch(`/api/squads/${squadCode}/join`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, resultId }),
        });
        sessionStorage.removeItem("squadCode");
        router.push(`/squad/${squadCode}`);
        return;
      }

      router.push(`/results/${resultId}`);
    } catch {
      setSubmitting(false);
      setError("Something went wrong. Please try again.");
    }
  }

  function handleAnswer(qId: string, value: unknown) {
    const nextAnswers = { ...answers, [qId]: value } as QuizAnswers;
    setAnswers(nextAnswers);

    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      finishQuiz(nextAnswers);
    }
  }

  const q = QUESTIONS[step];
  if (!userId && typeof window !== "undefined") return null;

  return (
    <div
      style={{ minHeight: "calc(100vh - 28px)", paddingTop: "32px", paddingBottom: "40px" }}
      className="animate-fade"
    >
      {/* Progress dots */}
      <div style={{ display: "flex", gap: "5px", padding: "0 24px", marginBottom: "32px" }}>
        {QUESTIONS.map((_, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: "2px",
              borderRadius: "1px",
              background: i <= step ? "var(--t1)" : "var(--s2)",
              transition: "background .3s",
            }}
          />
        ))}
      </div>

      {/* Meta label */}
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "10px",
          color: "var(--t3)",
          letterSpacing: ".12em",
          padding: "0 24px",
          marginBottom: "6px",
        }}
      >
        {q.meta}
      </div>

      {/* Question */}
      <div
        style={{
          fontFamily: "'Fraunces', serif",
          fontSize: "30px",
          lineHeight: "1.1",
          color: "var(--t1)",
          padding: "0 24px",
          marginBottom: "26px",
          fontWeight: 400,
        }}
      >
        {q.q}
      </div>

      {/* Question component */}
      {submitting ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "40px 24px",
            gap: "16px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              border: "3px solid var(--t3)",
              borderTopColor: "var(--t1)",
              borderRadius: "50%",
              animation: "spin .7s linear infinite",
            }}
          />
          <p style={{ color: "var(--t2)", fontSize: "14px" }}>Crunching the data...</p>
          {error && (
            <p style={{ color: "#E86A6A", fontSize: "14px", marginTop: "8px" }}>{error}</p>
          )}
        </div>
      ) : q.type === "scenario" ? (
        <ScenarioPick
          opts={(q as any).opts}
          onAnswer={(ans) => handleAnswer(q.id, ans)}
        />
      ) : q.type === "slider" && q.id === "budget" ? (
        <BudgetSlider onNext={(val) => handleAnswer(q.id, val)} />
      ) : q.type === "binary" ? (
        <BinaryRapidFire
          pairs={(q as any).pairs}
          onDone={(weights) => handleAnswer(q.id, weights)}
        />
      ) : q.type === "rank" ? (
        <DragToRank
          items={(q as any).items}
          onNext={(ranked) => handleAnswer(q.id, ranked)}
        />
      ) : q.type === "slider" && q.id === "noise" ? (
        <NoiseSlider onNext={(val) => handleAnswer(q.id, val)} />
      ) : q.type === "grid" ? (
        <VibeGrid
          cells={(q as any).cells}
          onAnswer={(ans) => handleAnswer(q.id, ans)}
        />
      ) : null}
    </div>
  );
}
