import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '@/services/api';
import { auth, googleProvider } from '@/lib/firebase';
import { signInWithPopup } from 'firebase/auth';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string; // Optional for Google login users
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  
  // Actions
  register: (data: {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
  }) => Promise<void>;
  
  login: (emailOrPhone: string, password: string) => Promise<void>;
  
  googleLogin: () => Promise<void>;
  
  logout: () => void;
  
  clearError: () => void;
  
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,
      isAuthenticated: false,

      // Register user
      register: async (data) => {
        set({ isLoading: true, error: null });
        try {
          console.log('📤 Registration Request:', data);
          const response = await api.post('/auth/register', data);
          console.log('✅ Registration Response:', response.data);
          
          if (response.data.status === 'success') {
            const { token, user } = response.data;
            
            // Save to localStorage
            localStorage.setItem('auth_token', token);
            localStorage.setItem('auth_user', JSON.stringify(user));
            
            set({
              user,
              token,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          }
        } catch (error: any) {
          console.error('❌ Registration Error:', error.response?.data || error.message);
          const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
          set({ error: errorMessage, isLoading: false });
          throw new Error(errorMessage);
        }
      },

      // Login user
      login: async (emailOrPhone, password) => {
        set({ isLoading: true, error: null });
        try {
          console.log('📤 Login Request:', { emailOrPhone, password: '***' });
          const response = await api.post('/auth/login', {
            emailOrPhone,
            password,
          });
          console.log('✅ Login Response:', response.data);
          
          if (response.data.status === 'success') {
            const { token, user } = response.data;
            
            // Save to localStorage
            localStorage.setItem('auth_token', token);
            localStorage.setItem('auth_user', JSON.stringify(user));
            
            set({
              user,
              token,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          }
        } catch (error: any) {
          console.error('❌ Login Error:', error.response?.data || error.message);
          const errorMessage = error.response?.data?.message || 'Login failed. Please check your credentials.';
          set({ error: errorMessage, isLoading: false });
          throw new Error(errorMessage);
        }
      },

      // Google login - Uses Firebase to get idToken, then sends to backend API
      googleLogin: async () => {
        set({ isLoading: true, error: null });
        try {
          console.log('📤 Starting Google Sign-In...');
          
          // Step 1: Sign in with Google using Firebase popup
          const result = await signInWithPopup(auth, googleProvider);
          console.log('✅ Google Sign-In Popup Success');
          console.log('👤 Google User:', {
            email: result.user.email,
            displayName: result.user.displayName,
          });
          
          // Step 2: Get Firebase ID Token
          const idToken = await result.user.getIdToken();
          console.log('✅ Firebase ID Token obtained');
          console.log('� idToken:', idToken.substring(0, 50) + '...');
          
          // Step 3: Send idToken to backend API
          console.log('📤 Calling API: POST /auth/google');
          console.log('📤 Request Body:', { idToken: idToken.substring(0, 50) + '...' });
          
          const response = await api.post('/auth/google', {
            idToken: idToken,
          });

          // Print full response for debugging
          console.log('========== GOOGLE LOGIN API RESPONSE ==========');
          console.log('✅ Status:', response.status);
          console.log('📦 Response Data:', JSON.stringify(response.data, null, 2));
          console.log('================================================');
          
          // Step 4: Handle successful response (same format as login)
          if (response.data.status === 'success') {
            const { token, user } = response.data;
            
            // Validate required fields
            if (!token || !user || !user.email) {
              console.error('❌ Invalid response: Missing required fields');
              throw new Error('Invalid response from server');
            }
            
            console.log('✅ Google Login API Success!');
            console.log('🔑 JWT Token:', token.substring(0, 50) + '...');
            console.log('👤 User Data:', {
              id: user.id,
              name: user.name,
              email: user.email,
              phone: user.phone || 'Not provided'
            });
            
            // Save to localStorage
            localStorage.setItem('auth_token', token);
            localStorage.setItem('auth_user', JSON.stringify(user));
            
            set({
              user,
              token,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
            
            console.log('✅ User saved to localStorage and state updated');
          } else {
            // Handle unexpected response format
            console.error('❌ Unexpected response status:', response.data.status);
            throw new Error(response.data.message || 'Google login failed');
          }
        } catch (error: any) {
          console.log('========== GOOGLE LOGIN ERROR ==========');
          console.error('Error:', error);
          console.error('Error Code:', error.code);
          console.error('Error Message:', error.message);
          if (error.response) {
            console.error('API Response Status:', error.response.status);
            console.error('API Response Data:', JSON.stringify(error.response.data, null, 2));
          }
          console.log('=========================================');
          
          // Handle specific Firebase errors
          let errorMessage = 'Google login failed. Please try again.';
          
          if (error.code === 'auth/popup-closed-by-user') {
            errorMessage = 'Sign-in popup was closed. Please try again.';
          } else if (error.code === 'auth/popup-blocked') {
            errorMessage = 'Popup was blocked by the browser. Please allow popups and try again.';
          } else if (error.code === 'auth/cancelled-popup-request') {
            errorMessage = 'Sign-in was cancelled. Please try again.';
          } else if (error.code === 'auth/network-request-failed') {
            errorMessage = 'Network error. Please check your internet connection.';
          } else if (error.response?.data?.message) {
            // Backend API error
            errorMessage = error.response.data.message;
          } else if (error.message) {
            errorMessage = error.message;
          }
          
          set({ error: errorMessage, isLoading: false });
          throw new Error(errorMessage);
        }
      },

      // Logout
      logout: () => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
      },

      // Clear error
      clearError: () => {
        set({ error: null });
      },

      // Check authentication status
      checkAuth: () => {
        const token = localStorage.getItem('auth_token');
        const userStr = localStorage.getItem('auth_user');
        
        if (token && userStr) {
          try {
            const user = JSON.parse(userStr);
            set({
              user,
              token,
              isAuthenticated: true,
            });
          } catch (error) {
            // Invalid data, clear everything
            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth_user');
            set({
              user: null,
              token: null,
              isAuthenticated: false,
            });
          }
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
