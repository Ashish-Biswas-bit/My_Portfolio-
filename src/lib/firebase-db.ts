// Firebase Firestore — isolated import to prevent bundling Firestore into auth-only pages
import { getFirestore } from "firebase/firestore";
import app from "./firebase";

export const db = getFirestore(app);
export default db;