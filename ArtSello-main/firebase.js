import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvU4d5aNgKzfggk6LGT_ujodiLcal9OQI",
  authDomain: "artsello-a947e.firebaseapp.com",
  projectId: "artsello-a947e",
  storageBucket: "artsello-a947e.appspot.com",
  messagingSenderId: "787126933925",
  appId: "1:787126933925:web:fc3d4881fa10d48849f04c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage for state persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// Initialize Firestore
const firestore = getFirestore(app);

export { app, auth, firestore };
