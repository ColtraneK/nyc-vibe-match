import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params;
    const supabase = createServerClient();

    const { data: squad, error } = await supabase
      .from("squads")
      .select("id, code, created_at")
      .eq("code", code.toUpperCase())
      .single();

    if (error || !squad) {
      return NextResponse.json({ error: "Squad not found" }, { status: 404 });
    }

    const { data: members } = await supabase
      .from("squad_members")
      .select("user_id, result_id, quiz_results(answers, matches), users(email)")
      .eq("squad_id", squad.id);

    return NextResponse.json({ squad, members: members || [] });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
