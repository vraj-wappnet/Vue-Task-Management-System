import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDDfULLJ5xinYc9y5Asqwbekd7x0UAEy7I",
  authDomain: "task-management-syatem.firebaseapp.com",
  projectId: "task-management-syatem",
  storageBucket: "task-management-syatem.firebasestorage.app",
  messagingSenderId: "837998901908",
  appId: "1:837998901908:web:bcb2465da0e98cef36d281",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Configure Google provider to always prompt for account selection
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export { auth, googleProvider, signInWithPopup };
