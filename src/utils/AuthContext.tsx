import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType, UserRole } from '../types';
import { auth } from './firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, createUserWithEmailAndPassword, updateProfile, User as FirebaseUser } from 'firebase/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper function to get user role from email
const getUserRoleFromEmail = (email: string): UserRole => {
  const userRoleMap: Record<string, UserRole> = {
    'test_user@legalyze.in': 'user',
    'test_lawyer@legalyze.in': 'lawyer',
    'test_admin@legalyze.in': 'admin'
  };
  
  return userRoleMap[email] || 'user';
};

// Helper function to get user name from email
const getUserNameFromEmail = (email: string) => {
  const userNameMap: Record<string, string> = {
    'test_user@legalyze.in': 'Test User',
    'test_lawyer@legalyze.in': 'Test Lawyer',
    'test_admin@legalyze.in': 'Test Admin'
  };
  
  return userNameMap[email] || email.split('@')[0];
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Check if we have user data in localStorage first
        const storedUserData = localStorage.getItem('legalyze_user');
        if (storedUserData) {
          try {
            const parsedUserData = JSON.parse(storedUserData);
            setUser(parsedUserData);
          } catch (error) {
            console.error('Error parsing stored user data:', error);
            // Fallback to creating user data from Firebase user
            createUserDataFromFirebase(firebaseUser);
          }
        } else {
          // Create user data from Firebase user
          createUserDataFromFirebase(firebaseUser);
        }
      } else {
        // User is signed out
        setUser(null);
        localStorage.removeItem('legalyze_user');
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);
  
  // Helper function to create user data from Firebase user
  const createUserDataFromFirebase = (firebaseUser: FirebaseUser) => {
    const userData: User = {
      id: firebaseUser.uid,
      email: firebaseUser.email || '',
      role: getUserRoleFromEmail(firebaseUser.email || ''),
      name: firebaseUser.displayName || getUserNameFromEmail(firebaseUser.email || '')
    };
    setUser(userData);
    localStorage.setItem('legalyze_user', JSON.stringify(userData));
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Check if Firebase is properly initialized
      if (!auth) {
        console.error('Firebase auth is not initialized');
        setIsLoading(false);
        return false;
      }

      // Sign in with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Get user role and name
      const role = getUserRoleFromEmail(email);
      const name = userCredential.user.displayName || getUserNameFromEmail(email);
      
      // Create user object
      const userData: User = {
        id: userCredential.user.uid,
        email: email,
        role: role,
        name: name
      };
      
      // Store in localStorage
      localStorage.setItem('legalyze_user', JSON.stringify(userData));
      
      // Set user in state
      setUser(userData);
      
      // Auth state listener will handle setting the user
      setIsLoading(false);
      return true;
    } catch (error: any) {
      console.error('Login error:', error.code, error.message);
      
      // Check if the error is related to Firebase setup
      if (error.code === 'auth/operation-not-allowed') {
        console.error('Email/password sign-in is not enabled in Firebase Console');
      }
      
      setIsLoading(false);
      return false;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      // Auth state listener will handle clearing the user
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const signup = async (email: string, password: string, name: string, role: UserRole = 'user'): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Check if Firebase is properly initialized
      if (!auth) {
        console.error('Firebase auth is not initialized');
        setIsLoading(false);
        return false;
      }

      // Create user with Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update profile with name
      await updateProfile(userCredential.user, {
        displayName: name
      });
      
      // Store user role in localStorage
      const userData: User = {
        id: userCredential.user.uid,
        email: email,
        role: role,
        name: name
      };
      
      localStorage.setItem('legalyze_user', JSON.stringify(userData));
      
      // Auth state listener will handle setting the user
      setIsLoading(false);
      return true;
    } catch (error: any) {
      console.error('Signup error:', error.code, error.message);
      
      // Check if the error is related to Firebase setup
      if (error.code === 'auth/operation-not-allowed') {
        console.error('Email/password sign-up is not enabled in Firebase Console');
      } else if (error.code === 'auth/invalid-api-key') {
        console.error('Invalid Firebase API key');
      } else if (error.code === 'auth/app-deleted') {
        console.error('Firebase app was deleted');
      } else if (error.code === 'auth/internal-error') {
        console.error('Firebase internal error - check your configuration');
      }
      
      setIsLoading(false);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};