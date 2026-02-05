'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from 'firebase/auth';
import { onAuthStateChange, signInWithGoogle, signOutUser } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  handleGoogleSignIn: () => Promise<void>;
  handleSignOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Handle Google Sign In
  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await signInWithGoogle();
      
      if (result.success && result.user) {
        setUser(result.user);
        return;
      } else {
        setError(result.error || 'Google sign in failed');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Google sign in error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle Sign Out
  const handleSignOut = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await signOutUser();
      
      if (result.success) {
        setUser(null);
      } else {
        setError(result.error || 'Sign out failed');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Sign out error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        error, 
        setUser, 
        setLoading, 
        setError,
        handleGoogleSignIn,
        handleSignOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return context;
};
