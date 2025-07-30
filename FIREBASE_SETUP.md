# Firebase Setup Instructions for Legalyze India

## Problem
If you're experiencing issues with sign-up or login functionality, it's likely that Firebase Authentication is not properly configured in your Firebase project.

## Solution
Follow these steps to properly set up Firebase Authentication:

### 1. Enable Email/Password Authentication

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `legalyze-india`
3. In the left sidebar, click on **Authentication**
4. Go to the **Sign-in method** tab
5. Click on **Email/Password** provider
6. Enable the **Email/Password** sign-in method
7. Click **Save**

### 2. Add Authorized Domains

1. While still in the **Authentication** section, go to the **Settings** tab
2. Scroll down to the **Authorized domains** section
3. Add the following domains if they're not already there:
   - `localhost` (for local development)
   - Your production domain (e.g., `legalyze-india.web.app` or your custom domain)
4. Click **Add** after entering each domain

### 3. Verify Firebase Configuration

The Firebase configuration in your project has been updated to include better error handling. The configuration is located in:

- `src/utils/firebase.ts` - Main Firebase configuration
- `src/utils/AuthContext.tsx` - Authentication context with improved error handling

### 4. Test Accounts

The application includes test accounts for different user roles:

- User: `test_user@legalyze.in` / `user123`
- Lawyer: `test_lawyer@legalyze.in` / `lawyer123`
- Admin: `test_admin@legalyze.in` / `admin123`

After setting up Firebase Authentication, you should be able to create these test accounts and use them to log in.

### 5. Troubleshooting

If you're still experiencing issues:

1. Check the browser console for specific error messages
2. Verify that your Firebase project is on the Blaze plan if you're using certain features
3. Make sure your Firebase API key is correct in the configuration
4. Try clearing your browser cache and cookies

### 6. Firebase Rules

Don't forget to set up proper security rules for Firestore and Storage to protect your data.

```javascript
// Example Firestore rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

```javascript
// Example Storage rules
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

For more detailed information, refer to the [Firebase Authentication documentation](https://firebase.google.com/docs/auth).