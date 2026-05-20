// Firebase Auth — tree-shakeable import that does NOT pull in Firestore
import { getAuth } from "firebase/auth";
import app from "./firebase";

export const auth = getAuth(app);
export default auth;