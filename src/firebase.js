// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from 'firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyBdyRVDYXtiZuD5PgOFnS3c2GGbcKbIn5E",
  authDomain: "goldenage-15a00.firebaseapp.com",
  projectId: "goldenage-15a00",
  storageBucket: "goldenage-15a00.appspot.com",
  messagingSenderId: "68415669270",
  appId: "1:68415669270:web:4906b21f9fc3a78088e137",
  measurementId: "G-CSZE3JSV18"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);