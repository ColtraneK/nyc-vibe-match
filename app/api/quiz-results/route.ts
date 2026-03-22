import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { userId, answers, matches } = await req.json();

    if (!userId || !answers || !matches) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (typeof userId !== "string" || !Array.isArray(matches)) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

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
