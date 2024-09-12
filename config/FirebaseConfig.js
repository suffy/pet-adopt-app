// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "pet-adopt-app-c1f5b.firebaseapp.com",
  projectId: "pet-adopt-app-c1f5b",
  storageBucket: "pet-adopt-app-c1f5b.appspot.com",
  messagingSenderId: "760076146980",
  appId: "1:760076146980:web:85035ba7539e0a1954fbb1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
