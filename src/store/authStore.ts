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
  role?: string; // 'user' | 'admin'
  profileImage?: string | null; // Google profile pic or uploaded avatar
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
            
            // Save to localStorage manually
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
        } catch (error: unknown) {
          console.error('❌ Registration Error:', error);
          const errorMessage = (error as any)?.response?.data?.message || 'Registration failed. Please try again.';
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
            
            // Save to localStorage manually
            localStorage.setItem('auth_token', token);
            localStorage.setItem('auth_user', JSON.stringify(user));
            
            set({
              user,
              token,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
            
            console.log('✅ Login data saved successfully');
            console.log('📦 Verify localStorage:', {
              hasToken: !!localStorage.getItem('auth_token'),
              hasUser: !!localStorage.getItem('auth_user')
            });
          }
        } catch (error: unknown) {
          console.error('❌ Login Error:', error);
          const errorMessage = (error as any)?.response?.data?.message || 'Login failed. Please check your credentials.';
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
          console.log('✅ Google Sign-In Popup Success:', result.user.email);
          
          // Step 2: Get Firebase ID Token
          const idToken = await result.user.getIdToken();
          console.log('✅ Firebase ID Token obtained');
          
          // Step 3: Send to backend - handles both new and existing users
          let loginSuccess = false;
          
          try {
            const response = await api.post('/auth/google', { idToken });
            console.log('📦 Backend Response:', response.data);
            
            if (response.data.status === 'success' && response.data.token && response.data.user) {
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
              
              loginSuccess = true;
              console.log('✅ Backend login successful! User:', user.email);
              console.log('📦 Verify localStorage:', {
                token: !!localStorage.getItem('auth_token'),
                user: !!localStorage.getItem('auth_user')
              });
            }
          } catch (apiErr) {
            console.log('⚠️ Backend API failed:', (apiErr as any)?.response?.data || (apiErr as any)?.message);
          }
          
          // Step 4: If backend failed, use Firebase user data directly
          if (!loginSuccess) {
            console.log('📝 Using Firebase user data as fallback...');
            
            const googleUser = {
              id: result.user.uid,
              name: result.user.displayName || 'Google User',
              email: result.user.email || '',
              phone: result.user.phoneNumber || undefined,
              profileImage: result.user.photoURL || null,
              role: 'user' as string,
            };
            
            const tempToken = `google_${result.user.uid}_${Date.now()}`;
            
            // Save to localStorage
            localStorage.setItem('auth_token', tempToken);
            localStorage.setItem('auth_user', JSON.stringify(googleUser));
            
            set({
              user: googleUser,
              token: tempToken,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
            
            console.log('✅ Fallback login successful! User:', googleUser.email);
            console.log('📦 Verify localStorage:', {
              token: !!localStorage.getItem('auth_token'),
              user: !!localStorage.getItem('auth_user')
            });
          }
          
        } catch (error: unknown) {
          const err = error as any;
          console.error('❌ Google Login Error:', err.code || err.message);
          
          let errorMessage = 'Google login failed. Please try again.';
          
          if (err.code === 'auth/popup-closed-by-user') {
            errorMessage = 'Sign-in popup was closed. Please try again.';
          } else if (err.code === 'auth/popup-blocked') {
            errorMessage = 'Popup was blocked by the browser. Please allow popups and try again.';
          } else if (err.code === 'auth/cancelled-popup-request') {
            errorMessage = 'Sign-in was cancelled. Please try again.';
          } else if (err.code === 'auth/network-request-failed') {
            errorMessage = 'Network error. Please check your internet connection.';
          }
          
          set({ error: errorMessage, isLoading: false });
          throw new Error(errorMessage);
        }
      },

      // Logout
      logout: () => {
        console.log('🚪 Logging out - clearing all auth data');
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
        localStorage.removeItem('auth-storage'); // Clear Zustand persist too
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
        
        console.log('🔍 checkAuth called:', { hasToken: !!token, hasUser: !!userStr });
        
        if (token && userStr) {
          try {
            const user = JSON.parse(userStr);
            set({
              user,
              token,
              isAuthenticated: true,
            });
            console.log('✅ checkAuth: User restored from localStorage');
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
        } else {
          // Check if Zustand persist has the data
          const state = get();
          if (state.token && state.user) {
            console.log('🔄 checkAuth: Restoring from Zustand persist to localStorage');
            localStorage.setItem('auth_token', state.token);
            localStorage.setItem('auth_user', JSON.stringify(state.user));
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
      onRehydrateStorage: () => {
        return (state) => {
          // When Zustand persist rehydrates, also restore to localStorage
          if (state?.token && state?.user) {
            console.log('🔄 Zustand rehydrated - syncing to localStorage');
            localStorage.setItem('auth_token', state.token);
            localStorage.setItem('auth_user', JSON.stringify(state.user));
          }
        };
      },
    }
  )
);
