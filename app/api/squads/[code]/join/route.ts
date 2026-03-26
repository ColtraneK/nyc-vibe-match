import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { Resend } from "resend";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params;
    const { userId, resultId } = await req.json();

    if (!userId || !resultId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const supabase = createServerClient();

    const { data: squad } = await supabase
      .from("squads")
      .select("id, code, creator_id")
      .eq("code", code.toUpperCase())
      .single();

    if (!squad) {
      return NextResponse.json({ error: "Squad not found" }, { status: 404 });
    }

    // Upsert to avoid duplicate members
    const { error } = await supabase.from("squad_members").upsert(
      { squad_id: squad.id, user_id: userId, result_id: resultId },
      { onConflict: "squad_id,user_id" }
    );

    if (error) throw error;

    // Send email to squad creator if a new person joined (not the creator themselves)
    if (userId !== squad.creator_id && process.env.RESEND_API_KEY) {
      // Get creator email and joiner info
      const [creatorRes, joinerRes] = await Promise.all([
        supabase.from("users").select("email").eq("id", squad.creator_id).single(),
        supabase
          .from("quiz_results")
          .select("matches")
          .eq("id", resultId)
          .single(),
      ]);

      const creatorEmail = creatorRes.data?.email;
      const joinerMatch = joinerRes.data?.matches?.[0];

      if (creatorEmail && joinerMatch) {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const squadUrl = `${APP_URL}/squad/${squad.code}`;

        await resend.emails.send({
          from: "NYC Vibe Match <nyc-quiz@email.aidgentic.com>",
          to: creatorEmail,
          subject: `Someone joined your squad — they got ${joinerMatch.n}`,
          html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:#0d1018;">
<table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#0d1018;">
  <tr><td align="center" style="padding:32px 16px;">
  <table cellpadding="0" cellspacing="0" border="0" width="520" style="max-width:520px;width:100%;">

    <tr><td style="padding-bottom:20px;font-family:Courier,monospace;font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:#4b5563;">SQUAD ${squad.code}</td></tr>

    <tr><td style="padding-bottom:20px;">
      <div style="font-family:Georgia,serif;font-size:26px;color:#F5F2EB;margin-bottom:8px;">New member just landed</div>
      <p style="margin:0 0 16px;font-family:Helvetica,Arial,sans-serif;font-size:14px;line-height:1.6;color:#9ca3af;">
        Someone joined your squad and matched with <strong style="color:${joinerMatch.c};">${joinerMatch.n}</strong> (${joinerMatch.score}%) in ${joinerMatch.b}.
      </p>
      <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:14px;line-height:1.6;color:#9ca3af;">
        Check the squad page to see how your neighborhoods compare.
      </p>
    </td></tr>

    <tr><td align="center" style="padding-bottom:28px;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr><td style="background:#F5F2EB;border-radius:100px;padding:14px 36px;">
          <a href="${squadUrl}" style="font-family:Helvetica,Arial,sans-serif;font-weight:600;font-size:15px;color:#131620;text-decoration:none;display:block;">View Squad</a>
        </td></tr>
      </table>
    </td></tr>

    <tr><td align="center" style="font-family:Courier,monospace;font-size:10px;color:#374151;letter-spacing:.08em;">NYC VIBE MATCH</td></tr>

  </table>
  </td></tr>
</table>
</body>
</html>`,
        }).catch((err) => {
          // Don't fail the join if email fails
          console.error("Squad join email error:", err);
        });
      }
    }

    return NextResponse.json({ ok: true, squadCode: squad.code });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
