"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase-db";
import { doc, getDoc, setDoc } from "firebase/firestore";
import ImageUploader from "@/components/admin/ImageUploader";
import toast, { Toaster } from "react-hot-toast";
import type { HeroData } from "@/lib/useFirestore";

const emptyHero: HeroData = {
  name: "",
  roles: [],
  description: "",
  cvUrl: "",
  avatarUrl: "",
  stats: [],
};

export default function HeroAdmin() {
  const [data, setData] = useState<HeroData>(emptyHero);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getDoc(doc(db, "siteContent", "hero")).then((snap) => {
      if (snap.exists()) setData(snap.data() as HeroData);
    });
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, "siteContent", "hero"), data);
      toast.success("Hero section saved!");
    } catch {
      toast.error("Failed to save");
    }
    setSaving(false);
  };

  return (
    <div>
      <Toaster position="top-right" />
      <h1 className="text-2xl font-bold mb-6">Hero Section</h1>

      <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-5 max-w-2xl">
        <div>
          <label className="block text-gray-400 text-sm mb-1">Name</label>
          <input
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white focus:border-cyan-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-1">
            Roles (comma separated)
          </label>
          <input
            value={data.roles.join(", ")}
            onChange={(e) =>
              setData({ ...data, roles: e.target.value.split(",").map((r) => r.trim()) })
            }
            className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white focus:border-cyan-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-1">Description</label>
          <textarea
            rows={3}
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white focus:border-cyan-500 focus:outline-none resize-none"
          />
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-1">CV / Resume URL</label>
          <input
            value={data.cvUrl}
            onChange={(e) => setData({ ...data, cvUrl: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white focus:border-cyan-500 focus:outline-none"
          />
        </div>

        <ImageUploader
          label="Avatar / Profile Photo"
          value={data.avatarUrl}
          onChange={(url) => setData({ ...data, avatarUrl: url })}
        />

        <h3 className="text-white font-semibold pt-2">Stats Counters</h3>
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
              className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:border-cyan-500 focus:outline-none"
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
              className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:border-cyan-500 focus:outline-none"
            />
            <input
              value={s.suffix}
              onChange={(e) => {
                const stats = [...data.stats];
                stats[i] = { ...stats[i], suffix: e.target.value };
                setData({ ...data, stats });
              }}
              placeholder="Suffix"
              className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:border-cyan-500 focus:outline-none"
            />
          </div>
        ))}

        <button
          onClick={save}
          disabled={saving}
          className="px-8 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold hover:opacity-90 transition disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
