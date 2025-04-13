'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../services/Auth/firebaseConfigue';
import { onAuthStateChanged } from 'firebase/auth';
import { setToken, removeToken } from '../services/Auth/cookies';

// Create the authentication context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Provider component that wraps the app and makes auth object available to any child component that calls useAuth()
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Set up auth state observer and triggers when user signs in/out
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsSignedIn(!!user);
      setUserId(user ? user.uid : null);
      setIsLoaded(true);
      
      if (user) {
        // Set up the cookie expiry time
        const expiryTime = new Date(Date.now() + 3600 * 1000);
        // Set the cookie with the user's token
        user.getIdToken().then(token => {
          setToken(token, expiryTime);
          localStorage.setItem('token', token);
        });
      } else {
        // Remove token if user is not authenticated
        removeToken();
        localStorage.removeItem('token');
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // The value passed to the context provider
  const value = {
    currentUser,
    isLoaded,
    isSignedIn,
    userId
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}