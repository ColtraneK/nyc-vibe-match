import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { userId, answers, matches } = await req.json();

    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("quiz_results")
      .insert({ user_id: userId, answers, matches })
      .select("id")
      .single();

    if (error) throw error;
    return NextResponse.json({ id: data.id });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
