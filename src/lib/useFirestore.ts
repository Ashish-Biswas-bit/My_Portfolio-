"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase-db";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  getDoc,
} from "firebase/firestore";

/* ─── Generic collection hook (real-time) ─── */
export function useCollection<T>(collectionName: string, orderField?: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = orderField
      ? query(collection(db, collectionName), orderBy(orderField))
      : query(collection(db, collectionName));

    const unsub = onSnapshot(
      q,
      (snap) => {
        const items = snap.docs.map((d) => ({ id: d.id, ...d.data() } as T));
        setData(items);
        setLoading(false);
      },
      () => setLoading(false)
    );

    return () => unsub();
  }, [collectionName, orderField]);

  return { data, loading };
}

/* ─── Single document hook ─── */
export function useDocument<T>(collectionName: string, docId: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!docId) return;
    getDoc(doc(db, collectionName, docId))
      .then((snap) => {
        if (snap.exists()) setData({ id: snap.id, ...snap.data() } as T);
      })
      .finally(() => setLoading(false));
  }, [collectionName, docId]);

  return { data, loading };
}

/* ─── Type definitions for Firestore documents ─── */
export interface HeroData {
  id?: string;
  name: string;
  roles: string[];
  description: string;
  cvUrl: string;
  avatarUrl: string;
  stats: { label: string; value: number; suffix: string }[];
}


export interface AboutData {
  id?: string;
  description: string;
  avatarUrl: string;
  stats: { label: string; value: string }[];
  bio?: string | string[];
}

export interface ProjectData {
  id?: string;
  title: string;
  description: string;
  tech: string[];
  category: string;
  image: string;
  github: string;
  live: string;
  highlights: string[];
  order: number;
}

export interface ServiceData {
  id?: string;
  title: string;
  description: string;
  tags: string[];
  gradient: string;
  iconName: string;
  order: number;
}

export interface ExperienceData {
  id?: string;
  role: string;
  company: string;
  period: string;
  description: string;
  skills: string[];
  color: string;
  order: number;
}

export interface TestimonialData {
  id?: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  avatar: string;
  avatarUrl: string;
  color: string;
  order: number;
}

export interface EducationData {
  id?: string;
  degree: string;
  institution: string;
  year: string;
  description: string;
  color: string;
  order: number;
}

export interface CertificationData {
  id?: string;
  title: string;
  issuer: string;
  year: string;
  color: string;
  order: number;
}

export interface SkillData {
  id?: string;
  name: string;
  level: number;
  category: string;
  color: string;
  iconName: string;
  language?: string;
  order: number;
}

export interface SocialData {
  id?: string;
  platform: string;
  url: string;
  order: number;
}

export interface SiteSettings {
  id?: string;
  email: string;
  phone: string;
  whatsapp: string;
  github: string;
  linkedin: string;
  footerText: string;
}
