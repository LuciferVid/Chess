import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut as authSignOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

// Create the authentication context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sign up function
  const signup = async (email, password, username) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Update the user profile with the display name
      await updateProfile(userCredential.user, {
        displayName: username
      });
      
      // Create user document in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        uid: userCredential.user.uid,
        email,
        username,
        displayName: username,
        createdAt: serverTimestamp(),
        gamesPlayed: 0,
        wins: 0,
        losses: 0,
        draws: 0,
        rating: 1200, // Default ELO rating
        recentGames: []
      });
      
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  };

  // Sign in function
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // Check if it's a new user
      const userDoc = await getDoc(doc(db, 'users', result.user.uid));
      
      if (!userDoc.exists()) {
        // New user, create profile
        await setDoc(doc(db, 'users', result.user.uid), {
          uid: result.user.uid,
          email: result.user.email,
          username: result.user.displayName || `User${Math.floor(Math.random() * 10000)}`,
          displayName: result.user.displayName || `User${Math.floor(Math.random() * 10000)}`,
          createdAt: serverTimestamp(),
          gamesPlayed: 0,
          wins: 0,
          losses: 0,
          draws: 0,
          rating: 1200,
          recentGames: []
        });
      }
      
      return result.user;
    } catch (error) {
      throw error;
    }
  };

  // Sign out function
  const signOut = async () => {
    try {
      setUserProfile(null);
      await authSignOut(auth);
    } catch (error) {
      throw error;
    }
  };

  // Reset password function
  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      throw error;
    }
  };

  // Fetch user profile data from Firestore
  const fetchUserProfile = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        setUserProfile(userDoc.data());
        return userDoc.data();
      }
      return null;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
  };

  // Update user stats after a game
  const updateUserStats = async (gameResult) => {
    if (!currentUser) return;
    
    try {
      const userDocRef = doc(db, 'users', currentUser.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const updatedStats = {
          gamesPlayed: userData.gamesPlayed + 1,
          wins: gameResult === 'win' ? userData.wins + 1 : userData.wins,
          losses: gameResult === 'loss' ? userData.losses + 1 : userData.losses,
          draws: gameResult === 'draw' ? userData.draws + 1 : userData.draws,
        };
        
        // Calculate new rating
        let ratingChange = 0;
        if (gameResult === 'win') ratingChange = 15;
        else if (gameResult === 'loss') ratingChange = -15;
        else if (gameResult === 'draw') ratingChange = 5;
        
        const newRating = userData.rating + ratingChange;
        
        // Update user document
        await setDoc(userDocRef, {
          ...userData,
          ...updatedStats,
          rating: newRating,
          recentGames: [
            {
              result: gameResult,
              date: serverTimestamp(),
              ratingChange: ratingChange
            },
            ...userData.recentGames.slice(0, 9) // Keep only the most recent 10 games
          ]
        });
        
        // Update local state
        await fetchUserProfile(currentUser.uid);
      }
    } catch (error) {
      console.error("Error updating user stats:", error);
    }
  };

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await fetchUserProfile(user.uid);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userProfile,
    loading,
    signup,
    login,
    signInWithGoogle,
    signOut,
    resetPassword,
    fetchUserProfile,
    updateUserStats
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 

// memoized auth state
