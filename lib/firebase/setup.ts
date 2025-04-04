import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
require("dotenv").config();

// Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

console.log("Firebase Configuration:", { firebaseConfig });

// Initialize Firebase app (ensure it's not initialized multiple times)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Analytics if measurementId is provided and environment is client-side
if (firebaseConfig.measurementId && typeof window !== "undefined") {
  import("firebase/analytics")
    .then(({ getAnalytics, isSupported }) => {
      isSupported().then((supported) => {
        if (supported) {
          getAnalytics(app);
        } else {
          console.warn(
            "Firebase Analytics is not supported in this environment."
          );
        }
      });
    })
    .catch((error) => {
      console.error("Error loading Firebase Analytics:", error);
    });
}

// Initlialize Firestore
const db = getFirestore(app);

// Initalize Authentication
const auth = getAuth(app);

export { app, auth, db };
