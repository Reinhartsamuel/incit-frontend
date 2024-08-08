// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD6bGaCLaBwJI4DVCiWgJN_WlcYYGJ-GDg",
  authDomain: "incit-assessment.firebaseapp.com",
  projectId: "incit-assessment",
  storageBucket: "incit-assessment.appspot.com",
  messagingSenderId: "250153466664",
  appId: "1:250153466664:web:d29bb881c4965dd52eee1d",
  measurementId: "G-L4XY81FHR0"
};

const config = firebaseConfig;

const app = !getApps().length ? initializeApp(config) : getApp();
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export const analytics = () => {
    if (typeof window !== 'undefined') {
        return getAnalytics(app);
    } else {
        return null;
    }
};

export { auth, db, storage };