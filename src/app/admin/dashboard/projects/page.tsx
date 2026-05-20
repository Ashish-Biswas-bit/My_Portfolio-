"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase-db";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import ImageUploader from "@/components/admin/ImageUploader";
import toast, { Toaster } from "react-hot-toast";
import { FiPlus, FiTrash2, FiEdit2, FiX } from "react-icons/fi";
import type { ProjectData } from "@/lib/useFirestore";

const empty: Omit<ProjectData, "id"> = {
  title: "",
  description: "",
  tech: [],
  category: "Web",
  image: "",
  github: "#",
  live: "#",
  highlights: [],
  order: 0,
};

export default function ProjectsAdmin() {
  const [items, setItems] = useState<ProjectData[]>([]);
  const [form, setForm] = useState<Omit<ProjectData, "id">>(empty);
  const [editId, setEditId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "projects"), orderBy("order"));
    return onSnapshot(q, (snap) => {
      setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() } as ProjectData)));
    });
  }, []);

  const openNew = () => {
    setForm({ ...empty, order: items.length });
    setEditId(null);
    setOpen(true);
  };

  const openEdit = (item: ProjectData) => {
    const { id, ...rest } = item;
    setForm(rest);
    setEditId(id!);
    setOpen(true);
  };

  const save = async () => {
    setSaving(true);
    try {
      if (editId) {
        await updateDoc(doc(db, "projects", editId), { ...form });
        toast.success("Project updated!");
      } else {
        await addDoc(collection(db, "projects"), form);
        toast.success("Project added!");
      }
      setOpen(false);
    } catch {
      toast.error("Failed to save");
    }
    setSaving(false);
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    await deleteDoc(doc(db, "projects", id));
    toast.success("Deleted!");
  };

  return (
    <div>
      <Toaster position="top-right" />
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition text-sm font-medium"
        >
          <FiPlus size={16} /> Add Project
        </button>
      </div>

      {/* List */}
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              {item.image.startsWith("http") ? (
                <img src={item.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
              ) : (
                <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-2xl">
                  {item.image || "📁"}
                </div>
              )}
              <div>
                <h3 className="text-white font-semibold">{item.title}</h3>
                <p className="text-gray-500 text-xs">{item.category} &middot; {item.tech.join(", ")}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => openEdit(item)} className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition">
                <FiEdit2 size={16} />
              </button>
              <button onClick={() => remove(item.id!)} className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition">
                <FiTrash2 size={16} />
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-gray-600 text-sm text-center py-8">No projects yet. Click &quot;Add Project&quot; to start.</p>
        )}
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-[#12122b] border border-white/10 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold">{editId ? "Edit" : "Add"} Project</h2>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-white">
                <FiX size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-1">Title</label>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:border-cyan-500 focus:outline-none" />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-1">Description</label>
                <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:border-cyan-500 focus:outline-none resize-none" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Category</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:border-cyan-500 focus:outline-none">
                    <option value="Web">Web</option>
                    <option value="Desktop">Desktop</option>
                    <option value="Game">Game</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Order</label>
                  <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:border-cyan-500 focus:outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-1">Tech (comma separated)</label>
                <input value={form.tech.join(", ")} onChange={(e) => setForm({ ...form, tech: e.target.value.split(",").map((t) => t.trim()) })} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:border-cyan-500 focus:outline-none" />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-1">Highlights (comma separated)</label>
                <input value={form.highlights.join(", ")} onChange={(e) => setForm({ ...form, highlights: e.target.value.split(",").map((t) => t.trim()) })} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:border-cyan-500 focus:outline-none" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-400 text-sm mb-1">GitHub URL</label>
                  <input value={form.github} onChange={(e) => setForm({ ...form, github: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:border-cyan-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Live URL</label>
                  <input value={form.live} onChange={(e) => setForm({ ...form, live: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:border-cyan-500 focus:outline-none" />
                </div>
              </div>

              <ImageUploader
                label="Project Image (or emoji)"
                value={form.image.startsWith("http") ? form.image : ""}
                onChange={(url) => setForm({ ...form, image: url })}
              />
              {!form.image.startsWith("http") && (
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Or use an emoji</label>
                  <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="w-20 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-2xl text-center focus:border-cyan-500 focus:outline-none" />
                </div>
              )}

              <button
                onClick={save}
                disabled={saving}
                className="w-full py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold hover:opacity-90 transition disabled:opacity-50"
              >
                {saving ? "Saving..." : editId ? "Update Project" : "Add Project"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
