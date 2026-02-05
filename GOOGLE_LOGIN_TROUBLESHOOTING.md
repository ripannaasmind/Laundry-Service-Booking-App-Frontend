# Google Login Troubleshooting Guide

## Common Issues and Solutions

### 1. **Popup Blocked Error**
**Error:** `auth/popup-blocked`

**Solution:**
- Allow popups in your browser for `localhost:3001`
- Check browser settings → Site Settings → Popups
- Try disabling popup blockers temporarily

### 2. **Firebase Configuration Issues**
**Error:** `auth/invalid-api-key` or similar

**Solution:**
- Verify Firebase configuration in `src/lib/firebase.ts`
- Check that the API key is correct
- Ensure the project is properly set up in Firebase Console

### 3. **Google Sign-In Not Enabled**
**Solution:**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `flutter-22f32`
3. Go to **Authentication** → **Sign-in method**
4. Enable **Google** as a sign-in provider
5. Add your domain (localhost) to authorized domains

### 4. **Backend API Not Responding**
**Error:** Network error when sending idToken to backend

**Solution:**
- Ensure backend server is running on `http://localhost:3000`
- Check that `/api/v1/auth/google` endpoint exists
- Verify the endpoint accepts `{ idToken: string }`

### 5. **CORS Issues**
**Error:** CORS policy blocking the request

**Solution:**
Add CORS configuration in your backend:
```javascript
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));
```

### 6. **Auth Domain Mismatch**
**Solution:**
- Check that `authDomain` in Firebase config matches your Firebase project
- Current: `flutter-22f32.firebaseapp.com`
- Add to Firebase Console → Authentication → Settings → Authorized domains

## Testing Steps

1. Open browser console (F12)
2. Go to `/login`
3. Click "Sign in with Google"
4. Watch console for logs:
   - `🔵 Login page: Starting Google Sign-In...`
   - `📤 Starting Google Sign-In...`
   - `✅ Firebase Google Sign-In Success`
   - `✅ ID Token obtained`
   - `📤 Sending token to backend...`
   - `✅ Google Login Response:`
   - `✅ User logged in successfully:`

## Debug Checklist

- [ ] Firebase Google Sign-In is enabled
- [ ] Backend server is running
- [ ] `/api/v1/auth/google` endpoint exists
- [ ] Browser allows popups for localhost
- [ ] No CORS errors in console
- [ ] Firebase config is correct
- [ ] Internet connection is stable

## Manual Test

Open browser console and run:
```javascript
// Test Firebase connection
firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
  .then(result => console.log('Success:', result))
  .catch(error => console.error('Error:', error));
```

## Contact Points

If all else fails, check:
1. Firebase Console error logs
2. Backend server logs
3. Browser network tab for failed requests
4. Firebase Auth domain settings
