"use client";

import { useEffect, useState } from "react";
import {
  db,
  collection, addDoc, updateDoc, deleteDoc, doc,
  onSnapshot, query, orderBy,
} from "@/lib/supabase-db";
import toast, { Toaster } from "react-hot-toast";
import { FiPlus, FiTrash2, FiEdit2, FiX } from "react-icons/fi";
import type { ExperienceData } from "@/lib/useContent";

const empty: Omit<ExperienceData, "id"> = {
  role: "",
  company: "",
  period: "",
  description: "",
  skills: [],
  color: "#F59E7B",
  order: 0,
};

export default function ExperienceAdmin() {
  const [items, setItems] = useState<ExperienceData[]>([]);
  const [form, setForm] = useState<Omit<ExperienceData, "id">>(empty);
  const [editId, setEditId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "experience"), orderBy("order"));
    return onSnapshot(q, (snap) => {
      setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() } as ExperienceData)));
    });
  }, []);

  const openNew = () => { setForm({ ...empty, order: items.length }); setEditId(null); setOpen(true); };
  const openEdit = (item: ExperienceData) => { const { id, ...rest } = item; setForm(rest); setEditId(id!); setOpen(true); };

  const save = async () => {
    setSaving(true);
    try {
      if (editId) { await updateDoc(doc(db, "experience", editId), { ...form }); toast.success("Updated!"); }
      else { await addDoc(collection(db, "experience"), form); toast.success("Added!"); }
      setOpen(false);
    } catch { toast.error("Failed to save"); }
    setSaving(false);
  };

  const remove = async (id: string) => {
    if (!confirm("Delete?")) return;
    await deleteDoc(doc(db, "experience", id));
    toast.success("Deleted!");
  };

  return (
    <div>
      <Toaster position="top-right" />
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Experience</h1>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-soft-peach/20 text-soft-peach hover:bg-soft-peach/30 transition text-sm font-medium">
          <FiPlus size={16} /> Add Experience
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="bg-white border border-deep-teal/10 rounded-xl p-4 flex items-center justify-between">
            <div>
              <h3 className="text-deep-teal font-semibold">{item.role}</h3>
              <p className="text-deep-teal/70 text-xs">{item.company} &middot; {item.period}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => openEdit(item)} className="p-2 rounded-lg hover:bg-deep-teal/5 text-deep-teal/75 hover:text-deep-teal transition"><FiEdit2 size={16} /></button>
              <button onClick={() => remove(item.id!)} className="p-2 rounded-lg hover:bg-red-500/10 text-deep-teal/75 hover:text-red-400 transition"><FiTrash2 size={16} /></button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-deep-teal/60 text-sm text-center py-8">No experience entries yet.</p>}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white border border-deep-teal/10 rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold">{editId ? "Edit" : "Add"} Experience</h2>
              <button onClick={() => setOpen(false)} className="text-deep-teal/75 hover:text-deep-teal"><FiX size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-deep-teal/75 text-sm mb-1">Role / Title</label>
                <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-white border border-deep-teal/10 text-deep-teal text-sm focus:border-soft-peach focus:outline-none" />
              </div>
              <div>
                <label className="block text-deep-teal/75 text-sm mb-1">Company</label>
                <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-white border border-deep-teal/10 text-deep-teal text-sm focus:border-soft-peach focus:outline-none" />
              </div>
              <div>
                <label className="block text-deep-teal/75 text-sm mb-1">Period</label>
                <input value={form.period} onChange={(e) => setForm({ ...form, period: e.target.value })} placeholder="2023 - Present" className="w-full px-3 py-2 rounded-lg bg-white border border-deep-teal/10 text-deep-teal text-sm focus:border-soft-peach focus:outline-none" />
              </div>
              <div>
                <label className="block text-deep-teal/75 text-sm mb-1">Description</label>
                <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-white border border-deep-teal/10 text-deep-teal text-sm focus:border-soft-peach focus:outline-none resize-none" />
              </div>
              <div>
                <label className="block text-deep-teal/75 text-sm mb-1">Skills (comma separated)</label>
                <input value={form.skills.join(", ")} onChange={(e) => setForm({ ...form, skills: e.target.value.split(",").map((t) => t.trim()) })} className="w-full px-3 py-2 rounded-lg bg-white border border-deep-teal/10 text-deep-teal text-sm focus:border-soft-peach focus:outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-deep-teal/75 text-sm mb-1">Color (hex)</label>
                  <input value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-white border border-deep-teal/10 text-deep-teal text-sm focus:border-soft-peach focus:outline-none" />
                </div>
                <div>
                  <label className="block text-deep-teal/75 text-sm mb-1">Order</label>
                  <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} className="w-full px-3 py-2 rounded-lg bg-white border border-deep-teal/10 text-deep-teal text-sm focus:border-soft-peach focus:outline-none" />
                </div>
              </div>
              <button onClick={save} disabled={saving} className="w-full py-2.5 rounded-lg bg-gradient-to-r bg-deep-teal text-ice-white hover:bg-soft-peach hover:text-deep-teal font-semibold hover:opacity-90 transition disabled:opacity-50">
                {saving ? "Saving..." : editId ? "Update" : "Add Experience"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
