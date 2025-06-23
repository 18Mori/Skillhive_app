import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration from environment variables
// Make sure you have a .env file in the root of your project with these variables.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase and export its services
let app;
let auth;
let db;
let firestoreAppId;

try {
  if (!firebaseConfig.apiKey) {
    throw new Error("Firebase config is missing or incomplete. Please create a .env file with your Firebase credentials.");
  }
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  firestoreAppId = firebaseConfig.projectId || 'default-app-id';
} catch (error) {
  console.error("Error during Firebase initialization:", error);
  throw error; // Stop the app if Firebase can't initialize
}

export { app, auth, db, firestoreAppId };