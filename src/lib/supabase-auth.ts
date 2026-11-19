import type { User } from "@supabase/supabase-js";
import {
  assertSupabaseConfigured,
  isSupabaseConfigured,
  supabase,
} from "./supabase";

export type { User };

export async function signInWithEmailAndPassword(
  _auth: typeof supabase,
  email: string,
  password: string
) {
  if (!isSupabaseConfigured()) {
    throw new Error(
      "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
  }
  assertSupabaseConfigured();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return { user: data.user };
}

export function onAuthStateChanged(
  _auth: typeof supabase,
  callback: (user: User | null) => void
) {
  if (!isSupabaseConfigured()) {
    console.error(
      "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
    callback(null);
    return () => undefined;
  }
  assertSupabaseConfigured();
  supabase.auth.getUser().then(({ data }) => callback(data.user));
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user ?? null);
  });
  return () => subscription.unsubscribe();
}

export function signOut(_auth: typeof supabase) {
  assertSupabaseConfigured();
  return supabase.auth.signOut();
}

export const auth = supabase;
