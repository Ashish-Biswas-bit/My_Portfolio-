"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase-db";
import { doc, getDoc, setDoc } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";
import type { SiteSettings } from "@/lib/useFirestore";

const defaults: SiteSettings = {
  email: "ashish@example.com",
  phone: "",
  whatsapp: "",
  github: "https://github.com/ashishbiswas",
  linkedin: "https://linkedin.com/in/ashishbiswas",
  footerText: "Full Stack Developer crafting modern web applications, desktop software, and games with passion and precision.",
};

export default function SettingsAdmin() {
  const [data, setData] = useState<SiteSettings>(defaults);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getDoc(doc(db, "siteContent", "settings")).then((snap) => {
      if (snap.exists()) setData(snap.data() as SiteSettings);
    });
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, "siteContent", "settings"), data);
      toast.success("Settings saved!");
    } catch {
      toast.error("Failed to save");
    }
    setSaving(false);
  };

  const inputClass = "w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white focus:border-cyan-500 focus:outline-none";

  return (
    <div>
      <Toaster position="top-right" />
      <h1 className="text-2xl font-bold mb-6">Site Settings</h1>

      <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-5 max-w-2xl">
        <div>
          <label className="block text-gray-400 text-sm mb-1">Email</label>
          <input value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} className={inputClass} />
        </div>
        <div>
          <label className="block text-gray-400 text-sm mb-1">Phone</label>
          <input value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} className={inputClass} />
        </div>
        <div>
          <label className="block text-gray-400 text-sm mb-1">WhatsApp Number</label>
          <input value={data.whatsapp} onChange={(e) => setData({ ...data, whatsapp: e.target.value })} placeholder="880XXXXXXXXX" className={inputClass} />
        </div>
        <div>
          <label className="block text-gray-400 text-sm mb-1">GitHub URL</label>
          <input value={data.github} onChange={(e) => setData({ ...data, github: e.target.value })} className={inputClass} />
        </div>
        <div>
          <label className="block text-gray-400 text-sm mb-1">LinkedIn URL</label>
          <input value={data.linkedin} onChange={(e) => setData({ ...data, linkedin: e.target.value })} className={inputClass} />
        </div>
        <div>
          <label className="block text-gray-400 text-sm mb-1">Footer Description</label>
          <textarea rows={3} value={data.footerText} onChange={(e) => setData({ ...data, footerText: e.target.value })} className={inputClass + " resize-none"} />
        </div>

        <button
          onClick={save}
          disabled={saving}
          className="px-8 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold hover:opacity-90 transition disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </div>
  );
}
