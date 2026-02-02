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
  apiKey: "AIzaSyBzd1_Per5H-HPRQ32-7frkuyoj0DFDwB0",
  authDomain: "laundry-service-booking-app.firebaseapp.com",
  projectId: "laundry-service-booking-app",
  storageBucket: "laundry-service-booking-app.firebasestorage.app",
  messagingSenderId: "705972337399",
  appId: "1:705972337399:web:5a2d5dd270a8fe2b56f1f2",
  measurementId: "G-N8QY71FHCT"
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

export { auth, app, analytics };
