'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../services/Auth/firebaseConfigue';
import { onAuthStateChanged } from 'firebase/auth';
import { setToken, removeToken, setUser as setUserCookie, getUser } from '../services/Auth/cookies';

/**
 * Authentication Context
 * Provides authentication state and user information throughout the application.
 * @type {React.Context}
 */
const AuthContext = createContext();

/**
 * Custom hook to access the authentication context
 * @returns {Object} Authentication context object containing:
 * - currentUser: The current authenticated user object
 * - isLoaded: Boolean indicating if the auth state has been initialized
 * - isSignedIn: Boolean indicating if a user is currently signed in
 * - userId: The current user's unique identifier
 * @throws {Error} If used outside of AuthProvider
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

/**
 * Authentication Provider Component
 * Manages authentication state and provides auth-related functionality to child components.
 * Handles user session persistence, token management, and auth state changes.
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be wrapped
 * @returns {JSX.Element} AuthContext Provider component
 */
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    /**
     * Sets up Firebase authentication state observer
     * Handles user sign-in/sign-out events and manages token storage
     */
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setIsSignedIn(!!user);
      setUserId(user ? user.uid : null);
      
      if (user) {
        // Set up the cookie expiry time
        const expiryTime = new Date(Date.now() + 3600 * 1000);
        try {
          // Set the cookie with the user's token
          const token = await user.getIdToken();
          setToken(token, expiryTime);
          localStorage.setItem('token', token);
          
          // Update user cookie if it doesn't exist or differs
          const cookieUser = getUser();
          if (!cookieUser || cookieUser.uid !== user.uid) {
            setUserCookie({
              uid: user.uid,
              email: user.email,
              name: user.displayName || user.email.split('@')[0],
            });
          }
        } catch (error) {
          console.error('Error setting auth token:', error);
        }
      } else {
        // Remove token if user is not authenticated
        removeToken();
        localStorage.removeItem('token');
      }
      
      setIsLoaded(true);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [isClient]);

  // Don't render anything during SSR
  if (!isClient) {
    return null;
  }

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