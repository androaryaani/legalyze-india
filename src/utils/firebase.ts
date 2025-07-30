import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = { 
  apiKey: "AIzaSyB6vyg_-BHuZZjw1p_8YI-GKbmyudaM26U", 
  authDomain: "legalyze-india.firebaseapp.com", 
  projectId: "legalyze-india", 
  storageBucket: "legalyze-india.appspot.com", 
  messagingSenderId: "361958644268", 
  appId: "1:361958644268:web:e245882dc80c02cc444f89", 
  measurementId: "G-YJ0GLDGL35" 
}; 

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Initialize Analytics only in browser environment
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { auth, db, storage, analytics };
export default app;