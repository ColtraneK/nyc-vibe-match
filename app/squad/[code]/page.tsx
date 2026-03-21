"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import NycMap from "@/components/NycMap";
import { ScoredNeighborhood } from "@/lib/scoring";

interface Member {
  user_id: string;
  result_id: string;
  quiz_results: { answers: unknown; matches: ScoredNeighborhood[] };
  users: { email: string };
}

const AVATARS = ["🦊", "🐺", "🦅", "🐬", "🦁", "🐝", "🦋", "🐙", "🦄", "🐸"];

function emailToEmoji(email: string): string {
  let hash = 0;
  for (const ch of email) hash = (hash * 31 + ch.charCodeAt(0)) & 0xffffffff;
  return AVATARS[Math.abs(hash) % AVATARS.length];
}

function emailToShortName(email: string): string {
  return email.split("@")[0].slice(0, 8);
}

export default function SquadPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = use(params);
  const router = useRouter();
  const [members, setMembers] = useState<Member[]>([]);
  const [squad, setSquad] = useState<{ code: string } | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [compare, setCompare] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [inviteCopied, setInviteCopied] = useState(false);

  async function fetchSquad() {
    const res = await fetch(`/api/squads/${code}`);
    if (res.ok) {
      const { squad: s, members: m } = await res.json();
      setSquad(s);
      setMembers(m || []);
    }
    setLoading(false);
  }

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    const resultId = sessionStorage.getItem("lastResultId");

    // If visitor has no quiz result, redirect to take quiz
    if (!userId) {
      router.replace(`/start?squad=${code}`);
      return;
    }

    fetchSquad();
    // Poll every 10 seconds for new members
    const interval = setInterval(fetchSquad, 10000);
    return () => clearInterval(interval);
  }, [code, router]);

  const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "";
  const inviteUrl = `${APP_URL}/start?squad=${code}`;

  async function copyInvite() {
    await navigator.clipboard.writeText(inviteUrl);
    setInviteCopied(true);
    setTimeout(() => setInviteCopied(false), 2000);
  }

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 28px)",
        }}
      >
        <div
          style={{
            width: "32px",
            height: "32px",
            border: "3px solid var(--t3)",
            borderTopColor: "var(--t1)",
            borderRadius: "50%",
            animation: "spin .7s linear infinite",
          }}
        />
      </div>
    );
  }

  const squadPins = members
    .filter((m) => m.quiz_results?.matches?.[0])
    .map((m) => ({
      avatar: emailToEmoji(m.users?.email || m.user_id),
      match: m.quiz_results.matches[0],
    }));

  const topMatches = members
    .filter((m) => m.quiz_results?.matches?.[0])
    .map((m) => m.quiz_results.matches[0]);

  const DIMS = [
    { key: "quiet", label: "Quiet" },
    { key: "food", label: "Food" },
    { key: "nl", label: "Night" },
    { key: "green", label: "Green" },
    { key: "safe", label: "Safe" },
    { key: "val", label: "Value" },
  ] as const;

  return (
    <div style={{ paddingTop: "16px", paddingBottom: "60px" }} className="animate-fade">
      {/* Header */}
      <div style={{ padding: "0 24px", marginBottom: "20px" }}>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "10px",
            color: "var(--t3)",
            letterSpacing: ".12em",
            textTransform: "uppercase",
            marginBottom: "4px",
          }}
        >
          SQUAD
        </div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 700,
            fontSize: "22px",
            color: "var(--c2)",
            letterSpacing: ".08em",
          }}
        >
          {squad?.code}
        </div>
      </div>

      {/* Member bubbles */}
      {members.length === 0 ? (
        <div style={{ textAlign: "center", padding: "28px 24px", color: "var(--t3)" }}>
          <p style={{ fontSize: "14px" }}>No members yet. Share the link below!</p>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            gap: "10px",
            padding: "0 24px",
            overflowX: "auto",
            marginBottom: "16px",
            scrollbarWidth: "none",
          }}
        >
          {members.map((m, i) => {
            const avatar = emailToEmoji(m.users?.email || m.user_id);
            const name = emailToShortName(m.users?.email || m.user_id);
            const match = m.quiz_results?.matches?.[0];
            const isSelected = selected === i;
            return (
              <div
                key={m.user_id}
                onClick={() => setSelected(isSelected ? null : i)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "4px",
                  cursor: "pointer",
                  minWidth: "58px",
                }}
              >
                <div
                  style={{
                    width: "46px",
                    height: "46px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                    border: `2px solid ${isSelected ? (match?.c || "var(--c2)") : "var(--b2)"}`,
                    background: isSelected ? `${match?.c || "var(--c2)"}20` : "transparent",
                    transition: "box-shadow .2s",
                  }}
                >
                  {avatar}
                </div>
                <span style={{ fontSize: "11px", color: "var(--t2)", fontWeight: 500 }}>
                  {name}
                </span>
                {match && (
                  <span
                    style={{
                      fontSize: "9px",
                      fontFamily: "'JetBrains Mono', monospace",
                      color: match.c,
                    }}
                  >
                    {match.n.split(" ")[0]}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Map */}
      {topMatches.length > 0 && <NycMap matches={topMatches} squadPins={squadPins} />}

      {/* Selected member detail */}
      {selected !== null && members[selected]?.quiz_results?.matches && (
        <div
          style={{
            margin: "0 16px 20px",
            padding: "14px",
            borderRadius: "14px",
            background: "var(--s0)",
            border: "1px solid var(--b1)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "12px",
            }}
          >
            <div style={{ fontSize: "24px" }}>
              {emailToEmoji(members[selected].users?.email || members[selected].user_id)}
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: "14px" }}>
                {emailToShortName(members[selected].users?.email || members[selected].user_id)}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "var(--t3)",
                  fontFamily: "'Fraunces', serif",
                }}
              >
                {members[selected].quiz_results.matches[0].n}
              </div>
            </div>

            {compare !== null && compare !== selected && (
              <>
                <div
                  style={{
                    fontStyle: "italic",
                    color: "var(--t3)",
                    fontSize: "14px",
                    fontFamily: "'Fraunces', serif",
                  }}
                >
                  vs
                </div>
                <div style={{ fontSize: "24px" }}>
                  {emailToEmoji(members[compare].users?.email || members[compare].user_id)}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "14px" }}>
                    {emailToShortName(members[compare].users?.email || members[compare].user_id)}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "var(--t3)",
                      fontFamily: "'Fraunces', serif",
                    }}
                  >
                    {members[compare].quiz_results.matches[0].n}
                  </div>
                </div>
              </>
            )}
          </div>

          {compare !== null && compare !== selected ? (
            // Comparison view
            <div>
              {DIMS.map(({ key, label }) => {
                const a = members[selected].quiz_results.matches[0][key] as number;
                const b = members[compare].quiz_results.matches[0][key] as number;
                return (
                  <div
                    key={key}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      marginBottom: "3px",
                    }}
                  >
                    <span
                      style={{
                        width: "15px",
                        fontFamily: "'JetBrains Mono', monospace",
                        fontWeight: 700,
                        fontSize: "10px",
                        textAlign: "center",
                      }}
                    >
                      {a}
                    </span>
                    <div
                      style={{
                        flex: 1,
                        height: "3px",
                        background: "var(--s2)",
                        borderRadius: "2px",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          height: "100%",
                          width: `${a * 10}%`,
                          background: members[selected].quiz_results.matches[0].c,
                          opacity: 0.5,
                          borderRadius: "2px",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          height: "100%",
                          width: `${b * 10}%`,
                          background: members[compare].quiz_results.matches[0].c,
                          opacity: 0.3,
                          borderRadius: "2px",
                        }}
                      />
                    </div>
                    <span
                      style={{
                        width: "40px",
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "8px",
                        color: "var(--t3)",
                        textTransform: "uppercase",
                        letterSpacing: ".04em",
                      }}
                    >
                      {label}
                    </span>
                    <span
                      style={{
                        width: "15px",
                        fontFamily: "'JetBrains Mono', monospace",
                        fontWeight: 700,
                        fontSize: "10px",
                        textAlign: "center",
                      }}
                    >
                      {b}
                    </span>
                  </div>
                );
              })}
              <button
                onClick={() => setCompare(null)}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--t3)",
                  fontSize: "12px",
                  textDecoration: "underline",
                  cursor: "pointer",
                  marginTop: "8px",
                }}
              >
                Clear compare
              </button>
            </div>
          ) : (
            // Select compare
            <div>
              <p style={{ fontSize: "12px", color: "var(--t3)", marginBottom: "8px" }}>
                Compare with:
              </p>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {members
                  .filter((_, i) => i !== selected)
                  .map((m, j) => {
                    const realIdx = members.indexOf(m);
                    return (
                      <button
                        key={m.user_id}
                        onClick={() => setCompare(realIdx)}
                        style={{
                          background: "var(--s1)",
                          border: "1px solid var(--b2)",
                          borderRadius: "100px",
                          padding: "6px 12px",
                          fontSize: "12px",
                          color: "var(--t2)",
                          cursor: "pointer",
                        }}
                      >
                        {emailToEmoji(m.users?.email || m.user_id)}{" "}
                        {emailToShortName(m.users?.email || m.user_id)}
                      </button>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Invite link */}
      <div
        style={{
          margin: "0 16px 18px",
          padding: "12px 14px",
          borderRadius: "10px",
          background: "var(--s1)",
          border: "1px dashed var(--b2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "11px",
            color: "var(--t2)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            flex: 1,
            marginRight: "10px",
          }}
        >
          {inviteUrl}
        </span>
        <button
          onClick={copyInvite}
          style={{
            background: "var(--t1)",
            color: "var(--bg)",
            borderRadius: "100px",
            fontWeight: 600,
            fontSize: "12px",
            padding: "8px 16px",
            flexShrink: 0,
          }}
        >
          {inviteCopied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}
