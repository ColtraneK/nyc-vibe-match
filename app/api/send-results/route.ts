import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { generateMatchReason } from "@/lib/match-reason";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

const DIMS = [
  { key: "food", label: "Food" },
  { key: "quiet", label: "Quiet" },
  { key: "nl", label: "Night" },
  { key: "green", label: "Green" },
  { key: "safe", label: "Safe" },
  { key: "val", label: "Value" },
  { key: "transit", label: "Transit" },
] as const;

export async function POST(req: NextRequest) {
  try {
    const { email, resultId, topMatch, answers, allMatches } = await req.json();
    const link = `${APP_URL}/results/${resultId}`;
    const resend = new Resend(process.env.RESEND_API_KEY || "placeholder");

    const matchReason = answers ? generateMatchReason(answers, topMatch) : "";
    const [para1, para2] = matchReason.split("\n\n");

    // Dim bars - table-safe, no flexbox
    const dimsHtml = DIMS.map(({ key, label }) => {
      const val = (topMatch[key] ?? 0) as number;
      const pct = val * 10;
      return `
        <tr>
          <td style="width:52px;padding:0 6px 5px 0;font-family:Courier,monospace;font-size:9px;color:#6b7280;text-transform:uppercase;letter-spacing:.06em;text-align:right;vertical-align:middle;">${label}</td>
          <td style="padding:0 0 5px;vertical-align:middle;">
            <table cellpadding="0" cellspacing="0" border="0" style="width:100%;height:3px;background:#2a2f3e;border-radius:2px;">
              <tr><td style="width:${pct}%;height:3px;background:${topMatch.c};border-radius:2px;font-size:0;line-height:0;">&nbsp;</td><td style="width:${100 - pct}%;font-size:0;line-height:0;">&nbsp;</td></tr>
            </table>
          </td>
          <td style="width:20px;padding:0 0 5px 6px;font-family:Courier,monospace;font-weight:700;font-size:11px;color:#9ca3af;vertical-align:middle;">${val}</td>
        </tr>`;
    }).join("");

    // Top 5 rows
    const top5Html = allMatches
      ? allMatches.slice(0, 5).map((m: typeof topMatch, i: number) => `
        <tr style="border-bottom:1px solid #1f2435;">
          <td style="width:36px;padding:10px 10px 10px 0;vertical-align:middle;">
            <table cellpadding="0" cellspacing="0" border="0">
              <tr><td style="width:28px;height:28px;background:${m.c};border-radius:7px;font-family:Courier,monospace;font-weight:700;font-size:12px;color:#000;text-align:center;vertical-align:middle;">${i + 1}</td></tr>
            </table>
          </td>
          <td style="padding:10px 0;vertical-align:middle;">
            <div style="font-size:15px;font-weight:500;color:#F5F2EB;margin-bottom:2px;">${m.n}</div>
            <div style="font-size:10px;color:#6b7280;text-transform:uppercase;letter-spacing:.04em;font-family:Courier,monospace;">${m.b}</div>
          </td>
          <td style="padding:10px 0 10px 10px;vertical-align:middle;text-align:right;font-family:Courier,monospace;font-weight:700;font-size:16px;color:${m.c};white-space:nowrap;">${m.score}%</td>
        </tr>`).join("")
      : "";

    const subwayLines = (topMatch.ln || "").split("/").map((line: string) =>
      `<span style="display:inline-block;width:20px;height:20px;background:${topMatch.c};border-radius:50%;font-family:Courier,monospace;font-weight:700;font-size:10px;color:#000;text-align:center;line-height:20px;margin-right:3px;">${line}</span>`
    ).join("");

    await resend.emails.send({
      from: "NYC Vibe Match <onboarding@resend.dev>",
      to: email,
      subject: `Your NYC match: ${topMatch.n} (${topMatch.score}%)`,
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Your NYC Vibe Match</title>
</head>
<body style="margin:0;padding:0;background-color:#0d1018;">
<table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#0d1018;">
  <tr><td align="center" style="padding:32px 16px;">
  <table cellpadding="0" cellspacing="0" border="0" width="520" style="max-width:520px;width:100%;">

    <!-- Header label -->
    <tr><td style="padding-bottom:20px;font-family:Courier,monospace;font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:#4b5563;">NYC VIBE MATCH</td></tr>

    <!-- MetroCard -->
    <tr><td style="padding-bottom:24px;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-radius:14px;overflow:hidden;border:1px solid rgba(255,255,255,.14);">
        <!-- Card top strip -->
        <tr>
          <td style="background:${topMatch.c};padding:10px 16px;">
            <table cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr>
                <td style="font-family:Courier,monospace;font-weight:700;font-size:13px;color:#000;">
                  <span style="background:rgba(0,0,0,.2);padding:2px 8px;border-radius:4px;">${topMatch.ln || "NYC"}</span>
                </td>
                <td align="right" style="font-family:Courier,monospace;font-size:9px;letter-spacing:.14em;color:rgba(0,0,0,.65);font-weight:600;text-transform:uppercase;">METROCARD</td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- Card body -->
        <tr>
          <td style="background:#1A2030;padding:18px 16px;">
            <div style="font-family:Georgia,serif;font-size:32px;font-weight:400;color:#F5F2EB;margin-bottom:2px;">${topMatch.n}</div>
            <div style="font-family:Courier,monospace;font-size:10px;color:#6b7280;letter-spacing:.08em;text-transform:uppercase;margin-bottom:12px;">${topMatch.b}</div>
            <div style="font-family:Courier,monospace;font-weight:700;font-size:26px;color:${topMatch.c};margin-bottom:4px;">${topMatch.score}<span style="font-size:13px;font-weight:400;color:#9ca3af;">% match</span></div>
            <div style="font-family:Georgia,serif;font-size:13px;color:#9ca3af;font-style:italic;margin-bottom:14px;padding-bottom:12px;border-bottom:1px solid rgba(255,255,255,.08);">${topMatch.tg}</div>
            <table cellpadding="0" cellspacing="0" border="0" width="100%">${dimsHtml}</table>
            <div style="margin-top:10px;">${subwayLines}</div>
          </td>
        </tr>
        <!-- Card footer -->
        <tr>
          <td style="background:#161b27;padding:8px 16px;">
            <table cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr>
                <td style="font-family:Courier,monospace;font-size:9px;color:#4b5563;letter-spacing:.06em;">NYC VIBE MATCH</td>
                <td align="right" style="font-family:Courier,monospace;font-size:9px;color:#4b5563;letter-spacing:.06em;">${new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }).toUpperCase()}</td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td></tr>

    <!-- About this match -->
    <tr><td style="padding-bottom:24px;">
      <div style="font-family:Courier,monospace;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#4b5563;margin-bottom:12px;">ABOUT YOUR MATCH</div>
      <p style="margin:0 0 12px;font-family:Helvetica,Arial,sans-serif;font-size:14px;line-height:1.7;color:#9ca3af;">${topMatch.vb}</p>
      ${para1 ? `<p style="margin:0 0 12px;font-family:Helvetica,Arial,sans-serif;font-size:14px;line-height:1.7;color:#9ca3af;">${para1}</p>` : ""}
      ${para2 ? `<p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:14px;line-height:1.7;color:#9ca3af;">${para2}</p>` : ""}
    </td></tr>

    ${top5Html ? `
    <!-- Top 5 -->
    <tr><td style="padding-bottom:28px;">
      <div style="font-family:Courier,monospace;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#4b5563;margin-bottom:12px;">YOUR TOP 5</div>
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#1A2030;border-radius:12px;border:1px solid rgba(255,255,255,.08);">
        <tr><td style="padding:0 14px;">
          <table cellpadding="0" cellspacing="0" border="0" width="100%">${top5Html}</table>
        </td></tr>
      </table>
    </td></tr>` : ""}

    <!-- CTA button -->
    <tr><td align="center" style="padding-bottom:28px;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr><td style="background:#F5F2EB;border-radius:100px;padding:14px 36px;">
          <a href="${link}" style="font-family:Helvetica,Arial,sans-serif;font-weight:600;font-size:15px;color:#131620;text-decoration:none;display:block;">View Full Results</a>
        </td></tr>
      </table>
    </td></tr>

    <!-- Squad prompt -->
    <tr><td style="padding-bottom:24px;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:rgba(255,255,255,.04);border-radius:12px;">
        <tr><td style="padding:16px;text-align:center;">
          <div style="font-size:22px;margin-bottom:6px;">&#128101;</div>
          <div style="font-family:Helvetica,Arial,sans-serif;font-size:14px;color:#d1d5db;margin-bottom:4px;font-weight:500;">Compare with your crew</div>
          <div style="font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#6b7280;">Create a squad from your results page and see where everyone lands on the map.</div>
        </td></tr>
      </table>
    </td></tr>

    <!-- Footer -->
    <tr><td align="center" style="font-family:Courier,monospace;font-size:10px;color:#374151;letter-spacing:.08em;padding-bottom:8px;">NYC VIBE MATCH &nbsp;·&nbsp; 55 HOODS &nbsp;·&nbsp; REAL DATA &nbsp;·&nbsp; SQUAD MODE</td></tr>

  </table>
  </td></tr>
</table>
</body>
</html>`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Send results error:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
