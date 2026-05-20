// ============================================
// Firebase Configuration
// ============================================
// INSTRUCTIONS: Replace the values below with your own Firebase project config.
// 1. Go to https://console.firebase.google.com/
// 2. Create a new project (or use existing)
// 3. Go to Project Settings > General > Your apps > Add web app
// 4. Copy the config object and paste the values below
// 5. Enable Firestore Database (Cloud Firestore) in the Firebase console
// 6. Enable Authentication > Email/Password sign-in method
// 7. Create an admin user in Authentication > Users > Add user
// ============================================

const firebaseConfig = {
    apiKey: "AIzaSyCn7BRS_IdovtccvaqgpvLT35xS1sPLVjU",
    authDomain: "portfolio-ce333.firebaseapp.com",
    projectId: "portfolio-ce333",
    storageBucket: "portfolio-ce333.firebasestorage.app",
    messagingSenderId: "932605873156",
    appId: "1:932605873156:web:bc74047f3adcd6c77df951",
    measurementId: "G-MLFMR63E0P"
};

// ============================================
// Cloudinary Configuration
// ============================================
// INSTRUCTIONS:
// 1. Go to https://cloudinary.com/ and create a free account
// 2. Go to Dashboard and copy your Cloud Name
// 3. Go to Settings > Upload > Add upload preset
//    - Set signing mode to "Unsigned"
//    - Note the preset name
// ============================================

const cloudinaryConfig = {
    cloudName: "delsuetna",
    uploadPreset: "portfolio"  // Replace with your unsigned upload preset name (e.g. "ml_default")
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
