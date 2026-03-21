import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params;
    const { userId, resultId } = await req.json();
    const supabase = createServerClient();

    const { data: squad } = await supabase
      .from("squads")
      .select("id")
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
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
