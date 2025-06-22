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
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore';

// Import components from their new paths
import Header from './components/Header.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import HomePage from './components/pages/HomePage.jsx';
import ExplorePage from './components/pages/ExplorePage.jsx';
import CommunityPage from './components/pages/CommunityPage.jsx';
import MentorDashboardPage from './components/pages/MentorDashboardPage.jsx';
import MentorProfilePage from './components/pages/MentorProfilePage.jsx';
import AvailabilityPage from './components/pages/AvailabilityPage.jsx';
import SessionsPage from './components/pages/SessionsPage.jsx';
import EarningsPage from './components/pages/EarningsPage.jsx';

function App() {
  // Global Authentication and View State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [firebaseAuth, setFirebaseAuth] = useState(null);
  const [firestoreDb, setFirestoreDb] = useState(null); // State for Firestore instance
  const [message, setMessage] = useState('');
  const [currentView, setCurrentView] = useState('home'); // Initial view is 'home'
  const [userProfile, setUserProfile] = useState(null); // Store user profile data from Firestore

  // Firebase Initialization
  useEffect(() => {
    try {
      const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
      const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
      const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : '';

      if (!Object.keys(firebaseConfig).length || !firebaseConfig.apiKey) {
        console.error("Firebase config is missing or incomplete. Cannot initialize Firebase.");
        setMessage("Firebase configuration is missing or incomplete. Please provide it in App.jsx.");
        return;
      }

      const app = initializeApp(firebaseConfig);
      const auth = getAuth(app);
      const db = getFirestore(app);

      setFirebaseAuth(auth);
      setFirestoreDb(db);

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
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          setIsAuthenticated(true);
          setUserId(user.uid);
          console.log("User is authenticated. UID:", user.uid);
          setMessage(`Welcome! Your user ID is: ${user.uid}`);

          // Fetch user profile from Firestore
          const profileDocRef = doc(db, `artifacts/${appId}/users/${user.uid}/profiles/userProfile`);
          try {
            const profileSnap = await getDoc(profileDocRef);
            if (profileSnap.exists()) {
              setUserProfile(profileSnap.data());
              console.log("User profile fetched:", profileSnap.data());
            } else {
              console.log("No user profile found for this user.");
              // Handle case where profile might not exist (e.g., new anonymous user)
            }
          } catch (profileError) {
            console.error("Error fetching user profile:", profileError);
          }
        } else {
          setIsAuthenticated(false);
          setUserId(null);
          setUserProfile(null);
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
      setCurrentView('home'); // Redirect to home on successful login
    } catch (error) {
      console.error('Login error:', error);
      setMessage(`Login failed: ${error.message}`);
    }
  };

  const handleSignUp = async (fullName, email, password, role, terms) => {
    if (!firebaseAuth || !firestoreDb) { setMessage("Firebase services are not initialized."); return; }
    if (!fullName || !email || !password) { setMessage("Please fill in all fields (Full Name, Email, Password) for sign up."); return; }
    if (!terms) { setMessage("You must agree to the Terms of Service to sign up."); return; }
    if (!role) { setMessage("Please select whether you are a Mentor or a Mentee."); return; }

    try {
      console.log('Attempting sign up with:', { fullName, email, password, role, terms });
      const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      const user = userCredential.user;
      const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

      // Store user profile in private collection
      const userProfileData = {
        fullName,
        email,
        role,
        userProfileImage: "https://via.placeholder.com/150/CCCCCC/FFFFFF?text=User", // Default placeholder
        createdAt: new Date(),
      };
      const profileDocRef = doc(firestoreDb, `artifacts/${appId}/users/${user.uid}/profiles/userProfile`);
      await setDoc(profileDocRef, userProfileData);
      console.log("User profile saved to Firestore:", userProfileData);

      // If mentor, also create a public profile entry
      if (role === 'mentor') {
        const publicMentorData = {
          userId: user.uid,
          fullName,
          email,
          role,
          // Add other public mentor details if needed (e.g., specialization, short bio)
          profileImage: "https://via.placeholder.com/150/CCCCCC/FFFFFF?text=Mentor", // Default placeholder for public profile
          specializations: [], // Example field
          averageRating: 0, // Example field
        };
        const publicMentorDocRef = doc(firestoreDb, `artifacts/${appId}/public/data/mentors/${user.uid}`);
        await setDoc(publicMentorDocRef, publicMentorData);
        console.log("Public mentor profile saved to Firestore:", publicMentorData);
      }

      setMessage('Account created successfully!');
      // Navigate based on role
      if (role === 'mentee') {
        setCurrentView('home'); // Redirect mentee to home
      } else if (role === 'mentor') {
        setCurrentView('mentorDashboard'); // Redirect mentor to mentor dashboard
      }
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
      setCurrentView('home'); // Redirect to home after logout
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
        {/* Pass userProfile.userProfileImage to Header for display, default to placeholder if not available */}
        <Header
          isAuthenticated={isAuthenticated}
          setCurrentView={setCurrentView}
          onLogout={handleLogout}
          userProfileImage={userProfile?.userProfileImage || "https://via.placeholder.com/150/CCCCCC/FFFFFF?text=User"}
        />

        <div className="px-4 md:px-40 flex flex-1 justify-center py-5">
          {/* Main content wrapper adjusted to handle different page widths */}
          <div className="layout-content-container flex flex-col w-full max-w-[960px] py-5 flex-1 items-center">
            {message && (
              <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded-xl relative mb-4 w-full md:max-w-[480px]">
                <span className="block sm:inline">{message}</span>
              </div>
            )}

            {userId && isAuthenticated && (
              <p className="text-[#121516] text-sm font-normal leading-normal pb-3 px-4 text-center">
                Current User ID: <span className="font-bold break-all">{userId}</span>
              </p>
            )}

            {/* Conditional Rendering based on currentView */}
            {currentView === 'home' && <HomePage />}
            {currentView === 'explore' && <ExplorePage firestoreDb={firestoreDb} />} {/* Pass firestoreDb to ExplorePage */}
            {currentView === 'community' && <CommunityPage />}
            {currentView === 'mentorDashboard' && isAuthenticated && userProfile?.role === 'mentor' && <MentorDashboardPage setCurrentView={setCurrentView} />}
            {currentView === 'mentorProfile' && isAuthenticated && userProfile?.role === 'mentor' && <MentorProfilePage setCurrentView={setCurrentView} />}
            {currentView === 'availability' && isAuthenticated && userProfile?.role === 'mentor' && <AvailabilityPage setCurrentView={setCurrentView} />}
            {currentView === 'sessions' && isAuthenticated && userProfile?.role === 'mentor' && <SessionsPage setCurrentView={setCurrentView} />}
            {currentView === 'earnings' && isAuthenticated && userProfile?.role === 'mentor' && <EarningsPage setCurrentView={setCurrentView} />}
            {currentView === 'myNetwork' && isAuthenticated && <p className="text-xl">My Network Page (Coming Soon!)</p>}
            {currentView === 'create' && isAuthenticated && <p className="text-xl">Create Page (Coming Soon!)</p>}

            {currentView === 'login' && !isAuthenticated && (
              <LoginForm onLogin={handleLogin} setCurrentView={setCurrentView} />
            )}
            {currentView === 'signup' && !isAuthenticated && (
              <SignupForm onSignUp={handleSignUp} setCurrentView={setCurrentView} />
            )}
            {/* If authenticated and on login/signup, and role based redirect not handled, redirect to home */}
            {isAuthenticated && !userProfile && (currentView === 'login' || currentView === 'signup') && setCurrentView('home')}
          </div>
        </div>

        {/* Footer */}
        <footer className="flex justify-center">
          <div className="flex max-w-[960px] flex-1 flex-col">
            <footer className="flex flex-col gap-6 px-5 py-10 text-center @container">
              <div className="flex flex-wrap items-center justify-center gap-6 @[480px]:flex-row @[480px]:justify-around">
                <a className="text-[#6a7781] text-base font-normal leading-normal min-w-40" href="#">About Us</a>
                <a className="text-[#6a7781] text-base font-normal leading-normal min-w-40" href="#">Contact</a>
                <a className="text-[#6a7781] text-base font-normal leading-normal min-w-40" href="#">FAQs</a>
                <a className="text-[#6a7781] text-base font-normal leading-normal min-w-40" href="#">Terms of Service</a>
                <a className="text-[#6a7781] text-base font-normal leading-normal min-w-40" href="#">Privacy Policy</a>
              </div>
              <p className="text-[#6a7788] text-base font-normal leading-normal">© 2024 SkillHive</p>
            </footer>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
