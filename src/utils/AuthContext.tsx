import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../types';
import { auth } from './firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, createUserWithEmailAndPassword, updateProfile, User as FirebaseUser } from 'firebase/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Map of email domains to user roles for testing
const userRoleMap: Record<string, 'user' | 'lawyer' | 'admin'> = {
  'test_user@legalyze.in': 'user',
  'test_lawyer@legalyze.in': 'lawyer',
  'test_admin@legalyze.in': 'admin'
};

// Helper function to determine user role based on email
const getUserRoleFromEmail = (email: string): 'user' | 'lawyer' | 'admin' => {
  return userRoleMap[email] || 'user';
};

// Helper function to get user name based on email
const getUserNameFromEmail = (email: string): string => {
  if (email.includes('lawyer')) return 'Advocate Sharma';
  if (email.includes('admin')) return 'Admin User';
  return 'Test User';
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in
        const email = firebaseUser.email || '';
        const userRole = getUserRoleFromEmail(email);
        const userName = getUserNameFromEmail(email);
        
        const userData: User = {
          id: firebaseUser.uid,
          email: email,
          role: userRole,
          name: userName
        };
        
        setUser(userData);
        localStorage.setItem('legalyze_user', JSON.stringify(userData));
      } else {
        // User is signed out
        setUser(null);
        localStorage.removeItem('legalyze_user');
      }
      setIsLoading(false);
    });
    
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Auth state listener will handle setting the user
      // Make sure to set isLoading to false after successful login
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Login error:', error);
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

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Create user with Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update profile with name
      await updateProfile(userCredential.user, {
        displayName: name
      });
      
      // Auth state listener will handle setting the user
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Signup error:', error);
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