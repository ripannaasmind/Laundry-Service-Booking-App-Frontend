import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { 
  getAuth, 
  RecaptchaVerifier, 
  signInWithPhoneNumber, 
  ConfirmationResult,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  Auth,
  User
} from 'firebase/auth';
import { getAnalytics, Analytics, isSupported } from 'firebase/analytics';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAea_Tdy31rxiIIz1mbtIEYHvcAzy3Tah4",
  authDomain: "flutter-22f32.firebaseapp.com",
  projectId: "flutter-22f32",
  storageBucket: "flutter-22f32.firebasestorage.app",
  messagingSenderId: "842164127167",
  appId: "1:842164127167:web:c8e07af6ec05b68fe7cd0a",
  measurementId: "G-J0RLL7VJ96"
};

// Initialize Firebase
let app: FirebaseApp;
let analytics: Analytics | null = null;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const auth: Auth = getAuth(app);
export const auths =getAuth(app);

// Initialize Analytics (client-side only)
if (typeof window !== 'undefined') {
  isSupported().then((supported: boolean) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

// Google Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Store confirmation result globally
let confirmationResult: ConfirmationResult | null = null;

// Auth Response Type
interface AuthResponse {
  success: boolean;
  user?: User;
  error?: string;
}


// Phone Auth Functions
export const setupRecaptcha = (containerId: string): RecaptchaVerifier => {
  const recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
    size: 'invisible',
    callback: () => {
      console.log('reCAPTCHA solved');
    },
    'expired-callback': () => {
      console.log('reCAPTCHA expired');
    }
  });
  return recaptchaVerifier;
};

export const sendOTP = async (phoneNumber: string, recaptchaVerifier: RecaptchaVerifier): Promise<ConfirmationResult> => {
  try {
    // Format phone number with country code if not present
    const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;
    confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, recaptchaVerifier);
    return confirmationResult;
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw error;
  }
};

export const verifyOTP = async (otp: string): Promise<AuthResponse> => {
  try {
    if (!confirmationResult) {
      return { success: false, error: 'No OTP request found. Please request OTP again.' };
    }
    const result = await confirmationResult.confirm(otp);
    return { 
      success: true, 
      user: result.user
    };
  } catch (error: unknown) {
    console.error('Error verifying OTP:', error);
    const errorMessage = error instanceof Error ? error.message : 'Invalid OTP';
    return { success: false, error: errorMessage };
  }
};

// Email Auth Functions
export const signUpWithEmail = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Send email verification
    await sendEmailVerification(userCredential.user);
    return { 
      success: true, 
      user: userCredential.user
    };
  } catch (error: unknown) {
    console.error('Error signing up:', error);
    const errorMessage = error instanceof Error ? error.message : 'Signup failed';
    return { success: false, error: errorMessage };
  }
};

export const signInWithEmail = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { 
      success: true, 
      user: userCredential.user
    };
  } catch (error: unknown) {
    console.error('Error signing in:', error);
    const errorMessage = error instanceof Error ? error.message : 'Login failed';
    return { success: false, error: errorMessage };
  }
};

export const resetPassword = async (email: string): Promise<{ success: boolean; error?: string }> => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error: unknown) {
    console.error('Error resetting password:', error);
    const errorMessage = error instanceof Error ? error.message : 'Password reset failed';
    return { success: false, error: errorMessage };
  }
};

// Google Sign In
export const signInWithGoogle = async (): Promise<AuthResponse> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return { 
      success: true, 
      user: result.user
    };
  } catch (error: unknown) {
    console.error('Error with Google sign in:', error);
    const errorMessage = error instanceof Error ? error.message : 'Google sign in failed';
    return { success: false, error: errorMessage };
  }
};

// Sign Out
export const signOutUser = async (): Promise<{ success: boolean; error?: string }> => {
  try {
    await auth.signOut();
    return { success: true };
  } catch (error: unknown) {
    console.error('Error signing out:', error);
    const errorMessage = error instanceof Error ? error.message : 'Sign out failed';
    return { success: false, error: errorMessage };
  }
};

// Get Current User
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

// Auth State Observer
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return auth.onAuthStateChanged(callback);
};

export { auth, app, analytics, googleProvider };
