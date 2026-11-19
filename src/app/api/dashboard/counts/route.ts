import { NextResponse } from "next/server";
import { db, collection, getCountFromServer } from "@/lib/supabase-db";
import { assertSupabaseConfigured } from "@/lib/supabase";

const sections = ["projects", "skills", "services", "experience", "testimonials", "education"];

export async function GET() {
  try {
    assertSupabaseConfigured();
    const counts: Record<string, number> = {};

    for (const col of sections) {
      try {
        const snap = await getCountFromServer(collection(db, col));
        counts[col] = snap.data().count;
      } catch (err) {
        console.error(`Error fetching count for ${col}:`, err);
        counts[col] = 0;
      }
    }

    return NextResponse.json(counts);
  } catch (error) {
    console.error("Error fetching dashboard counts:", error);
    return NextResponse.json(
      { error: "Failed to load dashboard data" },
      { status: 500 }
    );
  }
}
