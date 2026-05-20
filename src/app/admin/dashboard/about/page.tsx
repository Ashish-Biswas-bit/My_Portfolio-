"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase-db";
import { doc, getDoc, setDoc } from "firebase/firestore";
import ImageUploader from "@/components/admin/ImageUploader";
import toast, { Toaster } from "react-hot-toast";
import type { AboutData } from "@/lib/useFirestore";

const emptyAbout: AboutData = {
  bio: "",
  description: "",
  avatarUrl: "",
  stats: [],
};

export default function AboutAdmin() {
  const [data, setData] = useState<AboutData>(emptyAbout);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getDoc(doc(db, "siteContent", "about")).then((snap) => {
      if (snap.exists()) setData(snap.data() as AboutData);
    });
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, "siteContent", "about"), data);
      toast.success("About section saved!");
    } catch {
      toast.error("Failed to save");
    }
    setSaving(false);
  };

  return (
    <div>
      <Toaster position="top-right" />
      <h1 className="text-2xl font-bold mb-6">About Section</h1>

      <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-5 max-w-2xl">
        <ImageUploader
          label="Profile Photo"
          value={data?.avatarUrl || ""}
          onChange={(url) => setData((prev) => ({ ...(prev || emptyAbout), avatarUrl: url }))}
        />

        <div>
          <label className="block text-gray-400 text-sm mb-1">Bio</label>
          <textarea
            rows={5}
            value={data?.bio || ""}
            onChange={(e) => setData((prev) => ({ ...(prev || emptyAbout), bio: e.target.value }))}
            className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white focus:border-cyan-500 focus:outline-none resize-none"
          />
        </div>

        <h3 className="text-white font-semibold pt-2">Stats</h3>
        {(data?.stats || []).map((s, i) => (
          <div key={i} className="grid grid-cols-2 gap-3">
            <input
              value={s.label}
              onChange={(e) => {
                const stats = [...(data?.stats || [])];
                stats[i] = { ...stats[i], label: e.target.value };
                setData((prev) => ({ ...(prev || emptyAbout), stats }));
              }}
              placeholder="Label"
              className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:border-cyan-500 focus:outline-none"
            />
            <input
              value={s.value}
              onChange={(e) => {
                const stats = [...(data?.stats || [])];
                stats[i] = { ...stats[i], value: e.target.value };
                setData((prev) => ({ ...(prev || emptyAbout), stats }));
              }}
              placeholder="Value"
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
