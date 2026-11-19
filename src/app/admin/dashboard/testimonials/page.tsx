"use client";

import { useEffect, useState } from "react";
import {
  db,
  collection, addDoc, updateDoc, deleteDoc, doc,
  onSnapshot, query, orderBy,
} from "@/lib/supabase-db";
import ImageUploader from "@/components/admin/ImageUploader";
import toast, { Toaster } from "react-hot-toast";
import { FiPlus, FiTrash2, FiEdit2, FiX } from "react-icons/fi";
import type { TestimonialData } from "@/lib/useContent";

const empty: Omit<TestimonialData, "id"> = {
  name: "",
  role: "",
  text: "",
  rating: 5,
  avatar: "",
  avatarUrl: "",
  color: "#F59E7B",
  order: 0,
};

export default function TestimonialsAdmin() {
  const [items, setItems] = useState<TestimonialData[]>([]);
  const [form, setForm] = useState<Omit<TestimonialData, "id">>(empty);
  const [editId, setEditId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "testimonials"), orderBy("order"));
    return onSnapshot(q, (snap) => {
      setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() } as TestimonialData)));
    });
  }, []);

  const openNew = () => { setForm({ ...empty, order: items.length }); setEditId(null); setOpen(true); };
  const openEdit = (item: TestimonialData) => { const { id, ...rest } = item; setForm(rest); setEditId(id!); setOpen(true); };

  const save = async () => {
    setSaving(true);
    try {
      if (editId) { await updateDoc(doc(db, "testimonials", editId), { ...form }); toast.success("Updated!"); }
      else { await addDoc(collection(db, "testimonials"), form); toast.success("Added!"); }
      setOpen(false);
    } catch { toast.error("Failed to save"); }
    setSaving(false);
  };

  const remove = async (id: string) => {
    if (!confirm("Delete?")) return;
    await deleteDoc(doc(db, "testimonials", id));
    toast.success("Deleted!");
  };

  return (
    <div>
      <Toaster position="top-right" />
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Testimonials</h1>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-soft-peach/20 text-soft-peach hover:bg-soft-peach/30 transition text-sm font-medium">
          <FiPlus size={16} /> Add Testimonial
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="bg-white border border-deep-teal/10 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {item.avatarUrl ? (
                <img src={item.avatarUrl} alt="" className="w-10 h-10 rounded-full object-cover" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-soft-peach/20 flex items-center justify-center text-xs font-bold text-soft-peach">{item.avatar || "?"}</div>
              )}
              <div>
                <h3 className="text-deep-teal font-semibold">{item.name}</h3>
                <p className="text-deep-teal/70 text-xs">{item.role}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => openEdit(item)} className="p-2 rounded-lg hover:bg-deep-teal/5 text-deep-teal/75 hover:text-deep-teal transition"><FiEdit2 size={16} /></button>
              <button onClick={() => remove(item.id!)} className="p-2 rounded-lg hover:bg-red-500/10 text-deep-teal/75 hover:text-red-400 transition"><FiTrash2 size={16} /></button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-deep-teal/60 text-sm text-center py-8">No testimonials yet.</p>}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white border border-deep-teal/10 rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold">{editId ? "Edit" : "Add"} Testimonial</h2>
              <button onClick={() => setOpen(false)} className="text-deep-teal/75 hover:text-deep-teal"><FiX size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-deep-teal/75 text-sm mb-1">Client Name</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-white border border-deep-teal/10 text-deep-teal text-sm focus:border-soft-peach focus:outline-none" />
              </div>
              <div>
                <label className="block text-deep-teal/75 text-sm mb-1">Role / Title</label>
                <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-white border border-deep-teal/10 text-deep-teal text-sm focus:border-soft-peach focus:outline-none" />
              </div>
              <div>
                <label className="block text-deep-teal/75 text-sm mb-1">Review Text</label>
                <textarea rows={3} value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-white border border-deep-teal/10 text-deep-teal text-sm focus:border-soft-peach focus:outline-none resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-deep-teal/75 text-sm mb-1">Rating (1-5)</label>
                  <input type="number" min={1} max={5} value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} className="w-full px-3 py-2 rounded-lg bg-white border border-deep-teal/10 text-deep-teal text-sm focus:border-soft-peach focus:outline-none" />
                </div>
                <div>
                  <label className="block text-deep-teal/75 text-sm mb-1">Initials (fallback)</label>
                  <input value={form.avatar} onChange={(e) => setForm({ ...form, avatar: e.target.value })} maxLength={3} className="w-full px-3 py-2 rounded-lg bg-white border border-deep-teal/10 text-deep-teal text-sm focus:border-soft-peach focus:outline-none" />
                </div>
              </div>
              <ImageUploader
                label="Client Photo"
                value={form.avatarUrl}
                onChange={(url) => setForm({ ...form, avatarUrl: url })}
              />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-deep-teal/75 text-sm mb-1">Accent Color</label>
                  <input value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-white border border-deep-teal/10 text-deep-teal text-sm focus:border-soft-peach focus:outline-none" />
                </div>
                <div>
                  <label className="block text-deep-teal/75 text-sm mb-1">Order</label>
                  <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} className="w-full px-3 py-2 rounded-lg bg-white border border-deep-teal/10 text-deep-teal text-sm focus:border-soft-peach focus:outline-none" />
                </div>
              </div>
              <button onClick={save} disabled={saving} className="w-full py-2.5 rounded-lg bg-gradient-to-r bg-deep-teal text-ice-white hover:bg-soft-peach hover:text-deep-teal font-semibold hover:opacity-90 transition disabled:opacity-50">
                {saving ? "Saving..." : editId ? "Update" : "Add Testimonial"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
