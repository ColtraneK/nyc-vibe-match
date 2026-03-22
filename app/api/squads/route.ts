import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

function randomCode(len = 6): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let result = "";
  for (let i = 0; i < len; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

export async function POST(req: NextRequest) {
  try {
    const { userId, resultId } = await req.json();

    if (!userId || !resultId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (typeof userId !== "string" || typeof resultId !== "string") {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const supabase = createServerClient();

    // Generate unique code
    let code = randomCode();
    let attempts = 0;
    while (attempts < 10) {
      const { data } = await supabase.from("squads").select("id").eq("code", code).single();
      if (!data) break;
      code = randomCode();
      attempts++;
    }

    const { data: squad, error } = await supabase
      .from("squads")
      .insert({ code, creator_id: userId })
      .select("id, code")
      .single();

    if (error) throw error;

    // Add creator as first member
    await supabase.from("squad_members").insert({
      squad_id: squad.id,
      user_id: userId,
      result_id: resultId,
    });

    return NextResponse.json({ code: squad.code, id: squad.id });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
