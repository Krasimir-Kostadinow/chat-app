// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDwUbxnjoe08rm220HCFBVDNKFTHawEtxU",
  authDomain: "chatapp-7125a.firebaseapp.com",
  projectId: "chatapp-7125a",
  storageBucket: "chatapp-7125a.appspot.com",
  messagingSenderId: "37104409092",
  appId: "1:37104409092:web:f835d6f0303985955d7351"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);