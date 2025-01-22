// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  apiKey: "AIzaSyAr6LbX5jbirAH_zPpqZv6NDMPUNNp5JgA",
  authDomain: "pet-adopt-app-6e282.firebaseapp.com",
  projectId: "pet-adopt-app-6e282",
  storageBucket: "pet-adopt-app-6e282.firebasestorage.app",
  messagingSenderId: "552903318511",
  appId: "1:552903318511:web:5de2dce548791e5e9c341a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
