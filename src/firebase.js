// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from 'firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyCrRNmOFeBAVGTZaVAbmcYkFFhEquctA40",
  authDomain: "carelink-a4fe6.firebaseapp.com",
  projectId: "carelink-a4fe6",
  storageBucket: "carelink-a4fe6.appspot.com",
  messagingSenderId: "266401446231",
  appId: "1:266401446231:web:8730bb5cd854889f2ce612",
  measurementId: "G-LV05VMVB7N"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);