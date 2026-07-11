import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  type User as FirebaseUser
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, googleProvider, isConfigured } from '@/lib/firebase';

export type UserRole = 'member' | 'leader' | 'admin';

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  phoneNumber?: string | null;
  role: UserRole;
  cellGroup?: string;
  joinedAt: Date;
  completedLessons: string[];
  spiritualLevel: number; // 1-5
}

interface AuthContextType {
  user: FirebaseUser | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isLeader: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>;
  completeLesson: (lessonId: string) => Promise<void>;
  hasCompletedLesson: (lessonId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Mock mode is active when Firebase is not configured
const MOCK_MODE = !isConfigured;

// Mock user data for demonstration
const MOCK_PROFILE: UserProfile = {
  uid: 'mock-admin-001',
  email: 'pastor@tetelestai.org',
  displayName: 'Pastor Principal',
  photoURL: 'https://ui-avatars.com/api/?name=Pastor+Principal&background=1e3a5f&color=fff',
  phoneNumber: '(51) 99999-9999',
  role: 'admin',
  cellGroup: 'Célula Líderes',
  joinedAt: new Date('2024-01-15'),
  completedLessons: ['m33-01', 'm33-02', 'm33-03', 'lid-01', 'lid-02'],
  spiritualLevel: 5
};

// Simulated Firebase user for mock mode
const createMockFirebaseUser = (): FirebaseUser => {
  return {
    uid: MOCK_PROFILE.uid,
    email: MOCK_PROFILE.email,
    displayName: MOCK_PROFILE.displayName,
    photoURL: MOCK_PROFILE.photoURL,
    emailVerified: true,
    phoneNumber: MOCK_PROFILE.phoneNumber || null,
    isAnonymous: false,
    metadata: {
      creationTime: new Date().toISOString(),
      lastSignInTime: new Date().toISOString(),
    },
    providerData: [],
    refreshToken: 'mock-token',
    tenantId: null,
    delete: async () => {},
    getIdToken: async () => 'mock-token',
    getIdTokenResult: async () => ({
      token: 'mock-token',
      authTime: new Date().toISOString(),
      issuedAtTime: new Date().toISOString(),
      expirationTime: new Date(Date.now() + 3600000).toISOString(),
      signInProvider: 'password',
      claims: {},
    }),
    reload: async () => {},
    toJSON: () => ({}),
  } as unknown as FirebaseUser;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // RBAC helpers
  const isLeader = profile?.role === 'leader' || profile?.role === 'admin';
  const isAdmin = profile?.role === 'admin';

  // Initialize mock mode on mount
  useEffect(() => {
    if (MOCK_MODE) {
      // Check localStorage for saved mock session
      const savedSession = localStorage.getItem('mock_auth_session');
      if (savedSession) {
        setUser(createMockFirebaseUser());
        setProfile(MOCK_PROFILE);
      }
      setIsLoading(false);
    }
  }, []);

  // Listen for auth state changes (Firebase mode only)
  useEffect(() => {
    if (MOCK_MODE) return;

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      
      if (firebaseUser) {
        // Fetch user profile from Firestore
        const profileDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (profileDoc.exists()) {
          setProfile(profileDoc.data() as UserProfile);
        } else {
          // Create default profile for new users
          const newProfile: UserProfile = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            role: 'member',
            joinedAt: new Date(),
            completedLessons: [],
            spiritualLevel: 1
          };
          await setDoc(doc(db, 'users', firebaseUser.uid), newProfile);
          setProfile(newProfile);
        }
      } else {
        setProfile(null);
      }
      
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    if (MOCK_MODE) {
      // Accept any credentials in mock mode
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network
      const mockUser = createMockFirebaseUser();
      setUser(mockUser);
      setProfile(MOCK_PROFILE);
      localStorage.setItem('mock_auth_session', 'true');
      return;
    }
    await signInWithEmailAndPassword(auth, email, password);
  }, []);

  const register = useCallback(async (email: string, password: string, name: string) => {
    if (MOCK_MODE) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const updatedMockProfile = { ...MOCK_PROFILE, email, displayName: name };
      const mockUser = createMockFirebaseUser();
      setUser(mockUser);
      setProfile(updatedMockProfile);
      localStorage.setItem('mock_auth_session', 'true');
      return;
    }
    const { user: newUser } = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(newUser, { displayName: name });
    
    const newProfile: UserProfile = {
      uid: newUser.uid,
      email: newUser.email,
      displayName: name,
      photoURL: null,
      role: 'member',
      joinedAt: new Date(),
      completedLessons: [],
      spiritualLevel: 1
    };
    await setDoc(doc(db, 'users', newUser.uid), newProfile);
  }, []);

  const loginWithGoogle = useCallback(async () => {
    if (MOCK_MODE) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const mockUser = createMockFirebaseUser();
      setUser(mockUser);
      setProfile(MOCK_PROFILE);
      localStorage.setItem('mock_auth_session', 'true');
      return;
    }
    await signInWithPopup(auth, googleProvider);
  }, []);

  const logout = useCallback(async () => {
    if (MOCK_MODE) {
      setUser(null);
      setProfile(null);
      localStorage.removeItem('mock_auth_session');
      return;
    }
    await signOut(auth);
    setProfile(null);
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    if (MOCK_MODE) {
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log('Mock: Password reset email sent to', email);
      return;
    }
    await sendPasswordResetEmail(auth, email);
  }, []);

  const updateUserProfile = useCallback(async (data: Partial<UserProfile>) => {
    if (MOCK_MODE) {
      setProfile(prev => prev ? { ...prev, ...data } : null);
      return;
    }
    if (!user) return;
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, data, { merge: true });
    setProfile(prev => prev ? { ...prev, ...data } : null);
  }, [user]);

  const completeLesson = useCallback(async (lessonId: string) => {
    if (!profile) return;
    const newCompleted = [...profile.completedLessons, lessonId];
    await updateUserProfile({ completedLessons: newCompleted });
  }, [profile, updateUserProfile]);

  const hasCompletedLesson = useCallback((lessonId: string) => {
    return profile?.completedLessons.includes(lessonId) || false;
  }, [profile]);

  const value: AuthContextType = {
    user,
    profile,
    isLoading,
    isAuthenticated: !!user,
    isLeader,
    isAdmin,
    login,
    register,
    loginWithGoogle,
    logout,
    resetPassword,
    updateUserProfile,
    completeLesson,
    hasCompletedLesson
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

export default AuthContext;
