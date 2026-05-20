"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection, addDoc, updateDoc, deleteDoc, doc,
  onSnapshot, query, orderBy,
} from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";
import { FiPlus, FiTrash2, FiEdit2, FiX } from "react-icons/fi";
import { SiHtml5, SiCss, SiJavascript, SiNextdotjs, SiPython, SiMongodb, SiPostgresql, SiMysql } from "react-icons/si";
import { FaJava, FaGamepad, FaDesktop } from "react-icons/fa";
import { IconType } from "react-icons";
const iconMap: Record<string, IconType> = {
  SiHtml5, SiCss, SiJavascript, SiNextdotjs, SiPython, SiMongodb, SiPostgresql, SiMysql,
  FaJava, FaGamepad, FaDesktop,
  JavaScript: SiJavascript,
  Python: SiPython,
  Java: FaJava,
  HTML: SiHtml5,
  CSS: SiCss,
  NextJS: SiNextdotjs,
  MongoDB: SiMongodb,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  Game: FaGamepad,
  Desktop: FaDesktop,
};
import type { SkillData } from "@/lib/useFirestore";

const empty: Omit<SkillData, "id"> = {
  name: "",
  level: 80,
  category: "Frontend",
  color: "#00f5ff",
  iconName: "",
  order: 0,
};

export default function SkillsAdmin() {
  const [items, setItems] = useState<SkillData[]>([]);
  const [form, setForm] = useState<Omit<SkillData, "id">>(empty);
  const [editId, setEditId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "skills"), orderBy("order"));
    return onSnapshot(q, (snap) => {
      setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() } as SkillData)));
    });
  }, []);

  const openNew = () => { setForm({ ...empty, order: items.length }); setEditId(null); setOpen(true); };
  const openEdit = (item: SkillData) => { const { id, ...rest } = item; setForm(rest); setEditId(id!); setOpen(true); };

  const save = async () => {
    setSaving(true);
    try {
      if (editId) { await updateDoc(doc(db, "skills", editId), { ...form }); toast.success("Skill updated!"); }
      else { await addDoc(collection(db, "skills"), form); toast.success("Skill added!"); }
      setOpen(false);
    } catch { toast.error("Failed to save"); }
    setSaving(false);
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this skill?")) return;
    await deleteDoc(doc(db, "skills", id));
    toast.success("Deleted!");
  };

  // Auto-detect language and iconName for known languages
  const languageMap: Record<string, { iconName: string; language: string }> = {
    mysql: { iconName: "SiMysql", language: "MySQL" },
    javascript: { iconName: "SiJavascript", language: "JavaScript" },
    python: { iconName: "SiPython", language: "Python" },
    java: { iconName: "FaJava", language: "Java" },
    html: { iconName: "SiHtml5", language: "HTML" },
    css: { iconName: "SiCss", language: "CSS" },
    nextjs: { iconName: "SiNextdotjs", language: "NextJS" },
    mongodb: { iconName: "SiMongodb", language: "MongoDB" },
    postgresql: { iconName: "SiPostgresql", language: "PostgreSQL" },
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let updated = { ...form, name: value };
    const key = value.trim().toLowerCase();
    if (languageMap[key]) {
      updated = {
        ...updated,
        iconName: languageMap[key].iconName,
        language: languageMap[key].language,
      };
    }
    setForm(updated);
  };

  return (
    <div>
      <Toaster position="top-right" />
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Skills</h1>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition text-sm font-medium">
          <FiPlus size={16} /> Add Skill
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold" style={{ background: `${item.color}20`, color: item.color }}>
                {item.level}%
              </div>
              <div>
                <h3 className="text-white font-semibold">{item.name}</h3>
                <p className="text-gray-500 text-xs">{item.category}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => openEdit(item)} className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition"><FiEdit2 size={16} /></button>
              <button onClick={() => remove(item.id!)} className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition"><FiTrash2 size={16} /></button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-gray-600 text-sm text-center py-8">No skills yet.</p>}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-[#12122b] border border-white/10 rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold">{editId ? "Edit" : "Add"} Skill</h2>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-white"><FiX size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-1">Skill Name</label>
                <input value={form.name} onChange={handleNameChange} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:border-cyan-500 focus:outline-none" />
                {/* Show icon preview if detected */}
                <div className="flex items-center mt-2">
                  {form.language && iconMap[form.language] && (
                    <span className="mr-2">Preview:</span>
                  )}
                  {form.language && iconMap[form.language] && (
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-white/10 rounded-full">
                      {iconMap[form.language]({ size: 28 })}
                    </span>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Level (%)</label>
                  <input type="number" min={0} max={100} value={form.level} onChange={(e) => setForm({ ...form, level: Number(e.target.value) })} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:border-cyan-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Category</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:border-cyan-500 focus:outline-none">
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Database">Database</option>
                    <option value="Framework">Framework</option>
                    <option value="Specialty">Specialty</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Color (hex)</label>
                  <input value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:border-cyan-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Order</label>
                  <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:border-cyan-500 focus:outline-none" />
                </div>
              </div>
              <button onClick={save} disabled={saving} className="w-full py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold hover:opacity-90 transition disabled:opacity-50">
                {saving ? "Saving..." : editId ? "Update" : "Add Skill"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
