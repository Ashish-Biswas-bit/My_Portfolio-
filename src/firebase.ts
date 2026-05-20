// src/firebase.ts
// Re-exports from the modular lib/ structure
// This file exists for backward compatibility — please use @/lib/firebase, @/lib/firebase-db, or @/lib/firebase-auth instead.
export { db } from "@/lib/firebase-db";
export { auth } from "@/lib/firebase-auth";
export { default as app } from "@/lib/firebase";
