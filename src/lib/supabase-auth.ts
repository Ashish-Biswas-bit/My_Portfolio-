import type { User } from "@supabase/supabase-js";
import { supabase } from "./supabase";

export type { User };

export async function signInWithEmailAndPassword(
  _auth: typeof supabase,
  email: string,
  password: string
) {
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
  supabase.auth.getUser().then(({ data }) => callback(data.user));
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user ?? null);
  });
  return () => subscription.unsubscribe();
}

export function signOut(_auth: typeof supabase) {
  return supabase.auth.signOut();
}

export const auth = supabase;
