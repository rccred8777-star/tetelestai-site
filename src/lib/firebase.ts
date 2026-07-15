// Firebase configuration - Replace with your actual Firebase config
// Get this from Firebase Console > Project Settings > General > Your Apps

import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, type Auth } from 'firebase/auth';
import {
  getFirestore, initializeFirestore, persistentLocalCache,
  persistentMultipleTabManager, type Firestore,
} from 'firebase/firestore';

// Check if Firebase is properly configured
const hasValidConfig = (): boolean => {
  const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
  const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
  return !!(apiKey && apiKey !== 'YOUR_API_KEY' && projectId && projectId !== 'YOUR_PROJECT_ID');
};

const isConfigured = hasValidConfig();

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'YOUR_API_KEY',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'YOUR_PROJECT_ID.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'YOUR_PROJECT_ID',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'YOUR_PROJECT_ID.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || 'YOUR_SENDER_ID',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || 'YOUR_APP_ID',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'YOUR_MEASUREMENT_ID'
};

// Initialize Firebase only if configured, otherwise create mock objects
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let googleProvider: GoogleAuthProvider;
let facebookProvider: FacebookAuthProvider;

if (isConfigured) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  // Firestore com cache local persistente (IndexedDB): o app funciona OFFLINE
  // — o líder faz a chamada e lança a oferta sem sinal, e sincroniza sozinho
  // quando a internet volta. Multi-abas suportado. Se algo falhar (ex.: aba
  // anônima), cai no Firestore padrão sem quebrar.
  try {
    db = initializeFirestore(app, {
      localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
    });
  } catch (e) {
    console.warn('Cache offline indisponível, usando Firestore padrão.', e);
    db = getFirestore(app);
  }
  googleProvider = new GoogleAuthProvider();
  facebookProvider = new FacebookAuthProvider();
} else {
  // Create minimal mock objects for when Firebase is not configured
  // This prevents crashes but auth operations will need to be handled by mock mode in AuthContext
  app = {} as FirebaseApp;
  auth = {} as Auth;
  db = {} as Firestore;
  googleProvider = {} as GoogleAuthProvider;
  facebookProvider = {} as FacebookAuthProvider;
}

export { app, auth, db, googleProvider, facebookProvider, isConfigured };
export default app;
