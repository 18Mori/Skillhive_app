import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithCustomToken,
  signInAnonymously,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Import getFirestore for completeness

// Import the new components
import Header from './Components/Header.jsx';
import LoginForm from './Components/Login.jsx';
import SignupForm from './Components/Signup.jsx';

function App() {
  // Global Authentication and View State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [firebaseAuth, setFirebaseAuth] = useState(null);
  const [message, setMessage] = useState('');
  const [currentView, setCurrentView] = useState('login'); // 'login' or 'signup'

  // Firebase Initialization
  useEffect(() => {
    try {
      // IMPORTANT: Replace these with your actual Firebase project configuration and custom token
      // You can get your Firebase config from your Firebase project settings in the console.
      const firebaseConfig = {
        apiKey: "YOUR_API_KEY", // <--- PASTE YOURS HERE
        authDomain: "YOUR_AUTH_DOMAIN",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_STORAGE_BUCKET",
        messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
        appId: "YOUR_APP_ID"
      };

      // Placeholder for initial auth token (if you have one from a backend)
      const initialAuthToken = ''; // Replace with your actual token if applicable

      if (!Object.keys(firebaseConfig).length || !firebaseConfig.apiKey) {
        console.error("Firebase config is missing or incomplete. Cannot initialize Firebase.");
        setMessage("Firebase configuration is missing or incomplete. Please provide it in App.jsx.");
        return;
      }

      const app = initializeApp(firebaseConfig);
      const auth = getAuth(app);
      const db = getFirestore(app); // Initialized but not directly used in this auth flow

      setFirebaseAuth(auth);

      // Sign in with custom token or anonymously
      const signIn = async () => {
        try {
          if (initialAuthToken) {
            await signInWithCustomToken(auth, initialAuthToken);
            console.log("Signed in with custom token.");
          } else {
            await signInAnonymously(auth);
            console.log("Signed in anonymously.");
          }
        } catch (error) {
          console.error("Firebase authentication error:", error);
          setMessage(`Authentication error: ${error.message}`);
        }
      };

      signIn();

      // Set up auth state change listener
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setIsAuthenticated(true);
          setUserId(user.uid);
          console.log("User is authenticated. UID:", user.uid);
          setMessage(`Welcome! Your user ID is: ${user.uid}`);
        } else {
          setIsAuthenticated(false);
          setUserId(null);
          console.log("User is not authenticated.");
          setMessage("Please log in or sign up.");
        }
      });

      return () => unsubscribe(); // Clean up the subscription
    } catch (error) {
      console.error("Error during Firebase initialization:", error);
      setMessage(`Initialization error: ${error.message}`);
    }
  }, []);

  // Authentication Handlers
  const handleLogin = async (email, password) => {
    if (!firebaseAuth) { setMessage("Firebase Auth is not initialized."); return; }
    if (!email || !password) { setMessage("Please enter both email and password for login."); return; }
    try {
      console.log('Attempting login with:', { email, password });
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      setMessage('Login successful!');
    } catch (error) {
      console.error('Login error:', error);
      setMessage(`Login failed: ${error.message}`);
    }
  };

  const handleSignUp = async (fullName, email, password, role, terms) => {
    if (!firebaseAuth) { setMessage("Firebase Auth is not initialized."); return; }
    if (!fullName || !email || !password) { setMessage("Please fill in all fields (Full Name, Email, Password) for sign up."); return; }
    if (!terms) { setMessage("You must agree to the Terms of Service to sign up."); return; }
    if (!role) { setMessage("Please select whether you are a Mentor or a Mentee."); return; }

    try {
      console.log('Attempting sign up with:', { fullName, email, password, role, terms });
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
      setMessage('Account created successfully! Please log in.');
      setCurrentView('login'); // Switch to login view after successful signup
    } catch (error) {
      console.error('Sign up error:', error);
      setMessage(`Sign up failed: ${error.message}`);
    }
  };

  const handleLogout = async () => {
    if (!firebaseAuth) { setMessage("Firebase Auth is not initialized."); return; }
    try {
      await signOut(firebaseAuth);
      setMessage("You have been signed out.");
    } catch (error) {
      console.error("Logout error:", error);
      setMessage(`Logout failed: ${error.message}`);
    }
  };

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden"
      style={{
        '--checkbox-tick-svg': 'url(\'data:image/svg+xml,%3csvg viewBox=%270 0 16 16%27 fill=%27rgb(18,21,22)%27 xmlns=%27http://www.w3.org/2000/svg%27%3e%3cpath d=%27M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z%27/%3e%3c/svg%3e\')',
        fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif',
      }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <Header isAuthenticated={isAuthenticated} setCurrentView={setCurrentView} />

        <div className="px-4 md:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-full md:w-[512px] max-w-[960px] py-5 flex-1 items-center">
            {message && (
              <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded-xl relative mb-4 w-full md:max-w-[480px]">
                <span className="block sm:inline">{message}</span>
              </div>
            )}

            {userId && (
              <p className="text-[#121516] text-sm font-normal leading-normal pb-3 px-4 text-center">
                Current User ID: <span className="font-bold break-all">{userId}</span>
              </p>
            )}

            {isAuthenticated ? (
              <div className="flex flex-col items-center gap-4 px-4 py-3 w-full md:max-w-[480px]">
                <p className="text-[#121516] text-lg font-bold leading-normal">You are logged in!</p>
                <button
                  onClick={handleLogout}
                  className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-red-500 text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-red-600 transition-colors duration-200"
                >
                  <span className="truncate">Logout</span>
                </button>
              </div>
            ) : (
              currentView === 'login' ? (
                <LoginForm onLogin={handleLogin} setCurrentView={setCurrentView} />
              ) : (
                <SignupForm onSignUp={handleSignUp} setCurrentView={setCurrentView} />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
