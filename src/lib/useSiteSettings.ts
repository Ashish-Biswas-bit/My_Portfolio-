"use client";

import { useEffect, useState } from "react";
import { db, doc, onSnapshot } from "./supabase-db";
import type { SiteSettings } from "./useContent";

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [error, setError] = useState(false);

  useEffect(
    () =>
      onSnapshot(
        doc(db, "siteContent", "settings"),
        (snapshot) => {
          setError(false);
          setSettings(
            snapshot.exists() ? (snapshot.data() as SiteSettings) : null
          );
        },
        () => setError(true)
      ),
    []
  );

  return { settings, error };
}
