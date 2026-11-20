"use client";

import { useEffect, useState } from "react";
import { db, doc, getDoc, setDoc } from "@/lib/supabase-db";
import toast, { Toaster } from "react-hot-toast";
import type { SiteSettings } from "@/lib/useContent";

const defaults: SiteSettings = {
  email: "",
  phone: "",
  whatsapp: "",
  github: "",
  linkedin: "",
  footerText: "Full Stack Web & Desktop Software Developer.",
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

  const inputClass = "w-full px-4 py-2.5 rounded-lg bg-white border border-deep-teal/10 text-deep-teal focus:border-soft-peach focus:outline-none";

  return (
    <div>
      <Toaster position="top-right" />
      <h1 className="text-2xl font-bold mb-6">Site Settings</h1>

      <div className="bg-white border border-deep-teal/10 rounded-xl p-6 space-y-5 max-w-2xl">
        <div>
          <label className="block text-deep-teal/75 text-sm mb-1">Email</label>
          <input value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} className={inputClass} />
        </div>
        <div>
          <label className="block text-deep-teal/75 text-sm mb-1">Phone</label>
          <input value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} className={inputClass} />
        </div>
        <div>
          <label className="block text-deep-teal/75 text-sm mb-1">WhatsApp Number</label>
          <input value={data.whatsapp} onChange={(e) => setData({ ...data, whatsapp: e.target.value })} placeholder="880XXXXXXXXX" className={inputClass} />
        </div>
        <div>
          <label className="block text-deep-teal/75 text-sm mb-1">GitHub URL</label>
          <input value={data.github} onChange={(e) => setData({ ...data, github: e.target.value })} className={inputClass} />
        </div>
        <div>
          <label className="block text-deep-teal/75 text-sm mb-1">LinkedIn URL</label>
          <input value={data.linkedin} onChange={(e) => setData({ ...data, linkedin: e.target.value })} className={inputClass} />
        </div>
        <div>
          <label className="block text-deep-teal/75 text-sm mb-1">Footer Description</label>
          <textarea rows={3} value={data.footerText} onChange={(e) => setData({ ...data, footerText: e.target.value })} className={inputClass + " resize-none"} />
        </div>

        <button
          onClick={save}
          disabled={saving}
          className="px-8 py-2.5 rounded-lg bg-gradient-to-r bg-deep-teal text-ice-white hover:bg-soft-peach hover:text-deep-teal font-semibold hover:opacity-90 transition disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </div>
  );
}
