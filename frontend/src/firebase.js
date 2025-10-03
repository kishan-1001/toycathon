import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyD3SghRxFqZb-2QNOYxpL_MmeU2XLZBDeM",
  authDomain: "toycathon-2025.firebaseapp.com",
  projectId: "toycathon-2025",
  storageBucket: "toycathon-2025.firebasestorage.app",
  messagingSenderId: "475131633835",
  appId: "1:475131633835:web:dcd9f71caa452a3b9017ee",
  measurementId: "G-L5MH9WDH9W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;



