import React, { useEffect, useState } from 'react';
import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

interface TestUser {
  email: string;
  password: string;
  role: string;
}

const testUsers: TestUser[] = [
  { email: 'test_user@legalyze.in', password: 'user123', role: 'user' },
  { email: 'test_lawyer@legalyze.in', password: 'lawyer123', role: 'lawyer' },
  { email: 'test_admin@legalyze.in', password: 'admin123', role: 'admin' }
];

export const CreateTestUsers: React.FC = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Check if we've already tried to create users in this session
    const hasCreatedUsers = sessionStorage.getItem('hasCreatedTestUsers');
    if (hasCreatedUsers) {
      console.log('Already attempted to create test users in this session');
      return;
    }
    
    const createUsers = async () => {
      if (isCreating) return;
      
      setIsCreating(true);
      setMessage('Creating test users...');
      
      let createdCount = 0;
      let existingCount = 0;
      let errorCount = 0;
      
      for (const user of testUsers) {
        try {
          // Try to sign in first to check if user exists
          await signInWithEmailAndPassword(auth, user.email, user.password);
          console.log(`User ${user.email} already exists`);
          existingCount++;
          // Sign out immediately
          await auth.signOut();
        } catch (error: any) {
          // If user doesn't exist, create it
          if (error.code === 'auth/user-not-found') {
            try {
              await createUserWithEmailAndPassword(auth, user.email, user.password);
              console.log(`Created user ${user.email}`);
              createdCount++;
              // Sign out immediately
              await auth.signOut();
            } catch (createError: any) {
              console.error(`Error creating user ${user.email}:`, createError.message);
              errorCount++;
              if (createError.code !== 'auth/email-already-in-use') {
                setMessage(`Error creating test users: ${createError.message}`);
              }
            }
          } else if (error.code !== 'auth/wrong-password') {
            console.error(`Error checking user ${user.email}:`, error.message);
            errorCount++;
          }
        }
      }
      
      // Mark that we've attempted to create users in this session
      sessionStorage.setItem('hasCreatedTestUsers', 'true');
      
      if (createdCount > 0) {
        setMessage(`Created ${createdCount} test users! You can now log in with the test credentials.`);
      } else if (existingCount > 0 && errorCount === 0) {
        setMessage('All test users are ready! You can log in with the test credentials.');
      } else if (errorCount > 0) {
        setMessage(`Some errors occurred. Please check console for details.`);
      }
      
      setTimeout(() => setMessage(''), 5000);
      setIsCreating(false);
    };

    createUsers();
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {message && (
        <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-md shadow-md text-sm animate-pulse">
          {message}
        </div>
      )}
    </div>
  );
};

export default CreateTestUsers;