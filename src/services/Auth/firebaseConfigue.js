// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { FacebookAuthProvider, getAuth, GoogleAuthProvider, OAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getMessaging, isSupported } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyCB55J7Ezvys5ofQTZmiSpT5Sou4bMdOm8",
  authDomain: "metabolix-ed05e.firebaseapp.com",
  projectId: "metabolix-ed05e",
  storageBucket: "metabolix-ed05e.appspot.com",
  messagingSenderId: "626263424592",
  appId: "1:626263424592:web:a77efefeea9dd0cb6ddb55",
  measurementId: "G-8ZNG5L3N25"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const appleProvider = new OAuthProvider('apple.com');
const database = getDatabase(app);
let messaging = null;
if (typeof window !== 'undefined' && isSupported()) {
  messaging = getMessaging(app);
}

export { auth, googleProvider,facebookProvider,appleProvider, database, messaging };