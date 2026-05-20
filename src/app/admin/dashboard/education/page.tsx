"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection, addDoc, updateDoc, deleteDoc, doc,
  onSnapshot, query, orderBy,
} from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";
import { FiPlus, FiTrash2, FiEdit2, FiX } from "react-icons/fi";
import type { EducationData, CertificationData } from "@/lib/useFirestore";

const emptyEdu: Omit<EducationData, "id"> = {
  degree: "",
  institution: "",
  year: "",
  description: "",
  color: "#00f5ff",
  order: 0,
};

const emptyCert: Omit<CertificationData, "id"> = {
  title: "",
  issuer: "",
  year: "",
  color: "#ff00ff",
  order: 0,
};

export default function EducationAdmin() {
  /* Education */
  const [eduItems, setEduItems] = useState<EducationData[]>([]);
  const [eduForm, setEduForm] = useState<Omit<EducationData, "id">>(emptyEdu);
  const [eduEditId, setEduEditId] = useState<string | null>(null);
  const [eduOpen, setEduOpen] = useState(false);

  /* Certifications */
  const [certItems, setCertItems] = useState<CertificationData[]>([]);
  const [certForm, setCertForm] = useState<Omit<CertificationData, "id">>(emptyCert);
  const [certEditId, setCertEditId] = useState<string | null>(null);
  const [certOpen, setCertOpen] = useState(false);

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const q1 = query(collection(db, "education"), orderBy("order"));
    const u1 = onSnapshot(q1, (snap) => {
      setEduItems(snap.docs.map((d) => ({ id: d.id, ...d.data() } as EducationData)));
    });
    const q2 = query(collection(db, "certifications"), orderBy("order"));
    const u2 = onSnapshot(q2, (snap) => {
      setCertItems(snap.docs.map((d) => ({ id: d.id, ...d.data() } as CertificationData)));
    });
    return () => { u1(); u2(); };
  }, []);

  /* Education CRUD */
  const saveEdu = async () => {
    setSaving(true);
    try {
      if (eduEditId) { await updateDoc(doc(db, "education", eduEditId), { ...eduForm }); toast.success("Updated!"); }
      else { await addDoc(collection(db, "education"), eduForm); toast.success("Added!"); }
      setEduOpen(false);
    } catch { toast.error("Failed"); }
    setSaving(false);
  };

  const removeEdu = async (id: string) => {
    if (!confirm("Delete?")) return;
    await deleteDoc(doc(db, "education", id));
    toast.success("Deleted!");
  };

  /* Certification CRUD */
  const saveCert = async () => {
    setSaving(true);
    try {
      if (certEditId) { await updateDoc(doc(db, "certifications", certEditId), { ...certForm }); toast.success("Updated!"); }
      else { await addDoc(collection(db, "certifications"), certForm); toast.success("Added!"); }
      setCertOpen(false);
    } catch { toast.error("Failed"); }
    setSaving(false);
  };

  const removeCert = async (id: string) => {
    if (!confirm("Delete?")) return;
    await deleteDoc(doc(db, "certifications", id));
    toast.success("Deleted!");
  };

  const inputClass = "w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:border-cyan-500 focus:outline-none";

  return (
    <div>
      <Toaster position="top-right" />

      {/* ─── Education ─── */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Education</h1>
        <button onClick={() => { setEduForm({ ...emptyEdu, order: eduItems.length }); setEduEditId(null); setEduOpen(true); }} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition text-sm font-medium">
          <FiPlus size={16} /> Add
        </button>
      </div>

      <div className="space-y-3 mb-10">
        {eduItems.map((item) => (
          <div key={item.id} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between">
            <div>
              <h3 className="text-white font-semibold">{item.degree}</h3>
              <p className="text-gray-500 text-xs">{item.institution} &middot; {item.year}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { const { id, ...rest } = item; setEduForm(rest); setEduEditId(id!); setEduOpen(true); }} className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition"><FiEdit2 size={16} /></button>
              <button onClick={() => removeEdu(item.id!)} className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition"><FiTrash2 size={16} /></button>
            </div>
          </div>
        ))}
        {eduItems.length === 0 && <p className="text-gray-600 text-sm text-center py-6">No education entries yet.</p>}
      </div>

      {/* ─── Certifications ─── */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Certifications</h2>
        <button onClick={() => { setCertForm({ ...emptyCert, order: certItems.length }); setCertEditId(null); setCertOpen(true); }} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition text-sm font-medium">
          <FiPlus size={16} /> Add
        </button>
      </div>

      <div className="space-y-3">
        {certItems.map((item) => (
          <div key={item.id} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between">
            <div>
              <h3 className="text-white font-semibold">{item.title}</h3>
              <p className="text-gray-500 text-xs">{item.issuer} &middot; {item.year}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { const { id, ...rest } = item; setCertForm(rest); setCertEditId(id!); setCertOpen(true); }} className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition"><FiEdit2 size={16} /></button>
              <button onClick={() => removeCert(item.id!)} className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition"><FiTrash2 size={16} /></button>
            </div>
          </div>
        ))}
        {certItems.length === 0 && <p className="text-gray-600 text-sm text-center py-6">No certifications yet.</p>}
      </div>

      {/* ─── Education Modal ─── */}
      {eduOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-[#12122b] border border-white/10 rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold">{eduEditId ? "Edit" : "Add"} Education</h2>
              <button onClick={() => setEduOpen(false)} className="text-gray-400 hover:text-white"><FiX size={20} /></button>
            </div>
            <div className="space-y-4">
              <div><label className="block text-gray-400 text-sm mb-1">Degree</label><input value={eduForm.degree} onChange={(e) => setEduForm({ ...eduForm, degree: e.target.value })} className={inputClass} /></div>
              <div><label className="block text-gray-400 text-sm mb-1">Institution</label><input value={eduForm.institution} onChange={(e) => setEduForm({ ...eduForm, institution: e.target.value })} className={inputClass} /></div>
              <div><label className="block text-gray-400 text-sm mb-1">Year</label><input value={eduForm.year} onChange={(e) => setEduForm({ ...eduForm, year: e.target.value })} placeholder="2021 – 2025" className={inputClass} /></div>
              <div><label className="block text-gray-400 text-sm mb-1">Description</label><textarea rows={3} value={eduForm.description} onChange={(e) => setEduForm({ ...eduForm, description: e.target.value })} className={inputClass + " resize-none"} /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-gray-400 text-sm mb-1">Color</label><input value={eduForm.color} onChange={(e) => setEduForm({ ...eduForm, color: e.target.value })} className={inputClass} /></div>
                <div><label className="block text-gray-400 text-sm mb-1">Order</label><input type="number" value={eduForm.order} onChange={(e) => setEduForm({ ...eduForm, order: Number(e.target.value) })} className={inputClass} /></div>
              </div>
              <button onClick={saveEdu} disabled={saving} className="w-full py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold hover:opacity-90 transition disabled:opacity-50">
                {saving ? "Saving..." : eduEditId ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Certification Modal ─── */}
      {certOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-[#12122b] border border-white/10 rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold">{certEditId ? "Edit" : "Add"} Certification</h2>
              <button onClick={() => setCertOpen(false)} className="text-gray-400 hover:text-white"><FiX size={20} /></button>
            </div>
            <div className="space-y-4">
              <div><label className="block text-gray-400 text-sm mb-1">Title</label><input value={certForm.title} onChange={(e) => setCertForm({ ...certForm, title: e.target.value })} className={inputClass} /></div>
              <div><label className="block text-gray-400 text-sm mb-1">Issuer</label><input value={certForm.issuer} onChange={(e) => setCertForm({ ...certForm, issuer: e.target.value })} className={inputClass} /></div>
              <div className="grid grid-cols-3 gap-3">
                <div><label className="block text-gray-400 text-sm mb-1">Year</label><input value={certForm.year} onChange={(e) => setCertForm({ ...certForm, year: e.target.value })} className={inputClass} /></div>
                <div><label className="block text-gray-400 text-sm mb-1">Color</label><input value={certForm.color} onChange={(e) => setCertForm({ ...certForm, color: e.target.value })} className={inputClass} /></div>
                <div><label className="block text-gray-400 text-sm mb-1">Order</label><input type="number" value={certForm.order} onChange={(e) => setCertForm({ ...certForm, order: Number(e.target.value) })} className={inputClass} /></div>
              </div>
              <button onClick={saveCert} disabled={saving} className="w-full py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold hover:opacity-90 transition disabled:opacity-50">
                {saving ? "Saving..." : certEditId ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
