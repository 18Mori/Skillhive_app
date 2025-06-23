import React, { useState, useEffect } from 'react';
import {
  signInAnonymously,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc,
} from 'firebase/firestore';

// Import the centralized Firebase instances
import { auth, db, firestoreAppId } from './firebase.js';

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
import LoadingSpinner from './components/LoadingSpinner.jsx';

function App() {
  // Global Authentication and View State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null); // Can be anonymous or authenticated user UID
  const [message, setMessage] = useState('');
  const [currentView, setCurrentView] = useState('home'); // Initial view is 'home'
  const [userProfile, setUserProfile] = useState(null); // Store user profile data from Firestore
  const [isLoading, setIsLoading] = useState(true); // New state for initial auth check

  // Firebase Auth State Management
  useEffect(() => {
    // Establish an anonymous session on initial load if no user is signed in.
    // This ensures a UID is available, but the user is not "authenticated" in the app's sense.
    signInAnonymously(auth).catch(error => {
      console.error("Initial anonymous sign-in failed:", error);
      setMessage("Could not establish a session with the server.");
    });

    // onAuthStateChanged is the single source of truth for the user's sign-in state.
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // A user exists (can be anonymous or a real user).
        const isRealUser = !user.isAnonymous;
        setIsAuthenticated(isRealUser); // Only "real" users are considered authenticated.
        setUserId(user.uid);

        if (isRealUser) {
          console.log("User is authenticated. UID:", user.uid);
          // Fetch user profile from Firestore for authenticated users.
          const profileDocRef = doc(db, `artifacts/${firestoreAppId}/users/${user.uid}/profiles/userProfile`);
          try {
            const profileSnap = await getDoc(profileDocRef);
            if (profileSnap.exists()) {
              setUserProfile(profileSnap.data());
              console.log("User profile fetched:", profileSnap.data());
              setMessage(`Welcome back, ${profileSnap.data().fullName}!`);
            } else {
              console.log("No user profile found for this user.");
              setMessage("Welcome! Your profile is not yet complete.");
            }
          } catch (profileError) {
            console.error("Error fetching user profile:", profileError);
            setMessage("Could not fetch your profile data.");
          }
        } else {
          // User is anonymous.
          console.log("User is anonymous. UID:", user.uid);
          setUserProfile(null);
          setMessage("Please log in or sign up to get started.");
        }
      } else {
        // No user is signed in at all.
        setIsAuthenticated(false);
        setUserId(null);
        setUserProfile(null);
        console.log("User is not authenticated.");
        setMessage("Please log in or sign up.");
      }
      setIsLoading(false); // Auth state is resolved, no longer loading
    });

    return () => unsubscribe(); // Clean up the subscription on unmount.
  }, []);

  // Authentication Handlers
  const handleLogin = async (email, password) => {
    if (!email || !password) { setMessage("Please enter both email and password for login."); return; }
    try {
      console.log('Attempting login with:', { email, password });
      await signInWithEmailAndPassword(auth, email, password);
      setMessage('Login successful!');
      setCurrentView('home'); // Redirect to home on successful login
    } catch (error) {
      console.error('Login error:', error);
      setMessage(`Login failed: ${error.message}`);
    }
  };

  const handleSignUp = async (fullName, email, password, role, terms) => {
    if (!fullName || !email || !password) { setMessage("Please fill in all fields (Full Name, Email, Password) for sign up."); return; }
    if (!terms) { setMessage("You must agree to the Terms of Service to sign up."); return; }
    if (!role) { setMessage("Please select whether you are a Mentor or a Mentee."); return; }

    try {
      console.log('Attempting sign up with:', { fullName, email, password, role, terms });
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store user profile in private collection
      const userProfileData = {
        fullName,
        email,
        role,
        userProfileImage: `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=random`, // Better default placeholder
        createdAt: new Date(),
      };
      const profileDocRef = doc(db, `artifacts/${firestoreAppId}/users/${user.uid}/profiles/userProfile`);
      await setDoc(profileDocRef, userProfileData);
      console.log("User profile saved to Firestore:", userProfileData);

      // If mentor, also create a public profile entry
      if (role === 'mentor') {
        const publicMentorData = {
          userId: user.uid,
          fullName,
          email,
          role,
          // Add other public mentor details if needed
          profileImage: `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=random`, // Better default placeholder
          specializations: [], // Example field
          averageRating: 0, // Example field
        };
        const publicMentorDocRef = doc(db, `artifacts/${firestoreAppId}/public/data/mentors/${user.uid}`);
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
    try {
      await signOut(auth);
      setMessage("You have been signed out.");
      setCurrentView('home'); // Redirect to home after logout
    } catch (error) {
      console.error("Logout error:", error);
      setMessage(`Logout failed: ${error.message}`);
    }
  };

  // Display a loading spinner until the initial authentication check is complete
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <LoadingSpinner />
      </div>
    );
  }

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
          userProfile={userProfile}
          userProfileImage={userProfile?.userProfileImage || `https://ui-avatars.com/api/?name=?`}
        />

        <div className="px-4 md:px-40 flex flex-1 justify-center py-5">
          {/* Main content wrapper adjusted to handle different page widths */}
          <div className="layout-content-container flex flex-col w-full max-w-[960px] py-5 flex-1 items-center">
            {message && (
              <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded-xl relative mb-4 w-full md:max-w-[480px]">
                <span className="block sm:inline">{message}</span>
              </div>
            )}

            {/* This user ID display is useful for debugging, can be removed for production */}
            {userId && (
              <p className="text-[#121516] text-sm font-normal leading-normal pb-3 px-4 text-center">
                Current User ID: <span className="font-bold break-all">{userId}</span>
              </p>
            )}

            {/* Conditional Rendering based on currentView */}
            {currentView === 'home' && <HomePage setCurrentView={setCurrentView} />}
            {currentView === 'explore' && <ExplorePage firestoreDb={db} />} {/* Pass db instance to ExplorePage */}
            {currentView === 'community' && <CommunityPage />}
            {currentView === 'mentorDashboard' && isAuthenticated && userProfile?.role === 'mentor' && <MentorDashboardPage setCurrentView={setCurrentView} userProfile={userProfile} />}
            {currentView === 'mentorProfile' && isAuthenticated && userProfile?.role === 'mentor' && <MentorProfilePage setCurrentView={setCurrentView} />}
            {currentView === 'availability' && isAuthenticated && userProfile?.role === 'mentor' && <AvailabilityPage setCurrentView={setCurrentView} />}
            {currentView === 'sessions' && isAuthenticated && userProfile?.role === 'mentor' && <SessionsPage setCurrentView={setCurrentView} />}
            {currentView === 'earnings' && isAuthenticated && userProfile?.role === 'mentor' && <EarningsPage setCurrentView={setCurrentView} />}
            {currentView === 'myNetwork' && isAuthenticated && <p className="text-xl">My Network Page (Coming Soon!)</p>}
            {currentView === 'create' && isAuthenticated && <p className="text-xl">Create Page (Coming Soon!)</p>}

            {currentView === 'login' && !isAuthenticated && (
              <Login onLogin={handleLogin} setCurrentView={setCurrentView} />
            )}
            {currentView === 'signup' && !isAuthenticated && (
              <Signup onSignUp={handleSignUp} setCurrentView={setCurrentView} />
            )}
            {/* If a real user is somehow on login/signup, redirect them home */}
            {isAuthenticated && (currentView === 'login' || currentView === 'signup') && setCurrentView('home')}
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
