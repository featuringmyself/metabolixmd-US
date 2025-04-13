// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { FacebookAuthProvider, getAuth, GoogleAuthProvider, OAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getMessaging, isSupported } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const appleProvider = new OAuthProvider('apple.com');
const database = getDatabase(app);
let messaging = null;
const initializeMessaging = async () => {
  if (typeof window !== 'undefined') {
    try {
      const isMessagingSupported = await isSupported();
      if (isMessagingSupported) {
        messaging = getMessaging(app);
      }
    } catch (error) {
      console.error('Error initializing Firebase messaging:', error);
    }
  }
};

initializeMessaging();

export { auth, googleProvider,facebookProvider,appleProvider, database, messaging };