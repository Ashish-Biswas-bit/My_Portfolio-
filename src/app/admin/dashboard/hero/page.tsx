"use client";

import { useEffect, useState } from "react";
import { db, doc, getDoc, setDoc } from "@/lib/supabase-db";
import ImageUploader from "@/components/admin/ImageUploader";
import toast, { Toaster } from "react-hot-toast";
import type { HeroData } from "@/lib/useContent";

const emptyHero: HeroData = {
  name: "",
  roles: [],
  description: "",
  cvUrl: "",
  avatarUrl: "",
  stats: [],
};

function getHeroErrorMessage(error: unknown) {
  const errorCode =
    typeof error === "object" && error !== null && "code" in error
      ? error.code
      : undefined;

  if (errorCode === "PGRST205" || errorCode === "42P01") {
    return "Supabase is missing public.portfolio_content. Run scripts/supabase-schema.sql in the Supabase SQL Editor.";
  }

  if (error instanceof Error) return error.message;
  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message;
  }

  return "Unknown Supabase error.";
}

export default function HeroAdmin() {
  const [data, setData] = useState<HeroData>(emptyHero);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    void getDoc(doc(db, "siteContent", "hero"))
      .then((snap) => {
        if (snap.exists()) setData(snap.data() as HeroData);
      })
      .catch((error: unknown) => {
        console.error("Unable to load hero settings:", error);
        toast.error(getHeroErrorMessage(error));
      });
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, "siteContent", "hero"), data);
      toast.success("Hero section saved!");
    } catch (error) {
      console.error("Failed to save hero section:", error);
      toast.error(getHeroErrorMessage(error));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <Toaster position="top-right" />
      <h1 className="text-2xl font-bold mb-6">Hero Section</h1>

      <div className="bg-white border border-deep-teal/10 rounded-xl p-6 space-y-5 max-w-2xl">
        <div>
          <label className="block text-deep-teal/75 text-sm mb-1">Name</label>
          <input
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg bg-white border border-deep-teal/10 text-deep-teal focus:border-soft-peach focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-deep-teal/75 text-sm mb-1">
            Roles (comma separated)
          </label>
          <input
            value={data.roles.join(", ")}
            onChange={(e) =>
              setData({ ...data, roles: e.target.value.split(",").map((r) => r.trim()) })
            }
            className="w-full px-4 py-2.5 rounded-lg bg-white border border-deep-teal/10 text-deep-teal focus:border-soft-peach focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-deep-teal/75 text-sm mb-1">Description</label>
          <textarea
            rows={3}
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg bg-white border border-deep-teal/10 text-deep-teal focus:border-soft-peach focus:outline-none resize-none"
          />
        </div>

        <div>
          <label className="block text-deep-teal/75 text-sm mb-1">CV / Resume URL</label>
          <input
            value={data.cvUrl}
            onChange={(e) => setData({ ...data, cvUrl: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg bg-white border border-deep-teal/10 text-deep-teal focus:border-soft-peach focus:outline-none"
          />
        </div>

        <ImageUploader
          label="Avatar / Profile Photo"
          value={data.avatarUrl}
          onChange={(url) => setData({ ...data, avatarUrl: url })}
        />

        <h3 className="text-deep-teal font-semibold pt-2">Stats Counters</h3>
        {data.stats.map((s, i) => (
          <div key={i} className="grid grid-cols-3 gap-3">
            <input
              value={s.label}
              onChange={(e) => {
                const stats = [...data.stats];
                stats[i] = { ...stats[i], label: e.target.value };
                setData({ ...data, stats });
              }}
              placeholder="Label"
              className="px-3 py-2 rounded-lg bg-white border border-deep-teal/10 text-deep-teal text-sm focus:border-soft-peach focus:outline-none"
            />
            <input
              type="number"
              value={s.value}
              onChange={(e) => {
                const stats = [...data.stats];
                stats[i] = { ...stats[i], value: Number(e.target.value) };
                setData({ ...data, stats });
              }}
              placeholder="Value"
              className="px-3 py-2 rounded-lg bg-white border border-deep-teal/10 text-deep-teal text-sm focus:border-soft-peach focus:outline-none"
            />
            <input
              value={s.suffix}
              onChange={(e) => {
                const stats = [...data.stats];
                stats[i] = { ...stats[i], suffix: e.target.value };
                setData({ ...data, stats });
              }}
              placeholder="Suffix"
              className="px-3 py-2 rounded-lg bg-white border border-deep-teal/10 text-deep-teal text-sm focus:border-soft-peach focus:outline-none"
            />
          </div>
        ))}

        <button
          onClick={save}
          disabled={saving}
          className="px-8 py-2.5 rounded-lg bg-gradient-to-r bg-deep-teal text-ice-white hover:bg-soft-peach hover:text-deep-teal font-semibold hover:opacity-90 transition disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
