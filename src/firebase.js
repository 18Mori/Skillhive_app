import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration from environment variables.
// This relies on a .env file in your project's root directory.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase and export its services.
let app;
let auth;
let db;
let firestoreAppId;

try {
  // This check prevents the app from running with placeholder or missing credentials.
  if (!firebaseConfig.apiKey || firebaseConfig.apiKey.includes("YOUR_API_KEY")) {
    throw new Error("Firebase config is missing or incomplete. Please add your credentials to the .env file and restart the server.");
  }
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  firestoreAppId = firebaseConfig.projectId || 'default-app-id';
} catch (error) {
  console.error("Fatal Error during Firebase initialization:", error);
  // Throwing the error stops the app from running in a broken state.
  throw error;
}

export { app, auth, db, firestoreAppId };