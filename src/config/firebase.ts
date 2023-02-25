// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBr5QxoRbz0QBDHJx9s8Y5vmxz5N8Qq_VY",
  authDomain: "tasksflow-e7dc4.firebaseapp.com",
  projectId: "tasksflow-e7dc4",
  storageBucket: "tasksflow-e7dc4.appspot.com",
  messagingSenderId: "104793779186",
  appId: "1:104793779186:web:bd23dba98fef3ffd90d96b",
  measurementId: "G-JQE78LKCQN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

// Sign In
export const SignIn = async () => {
  const auth = getAuth();
  try {
    await signInWithPopup(auth, provider);
  } catch(err) {
    console.log(err);
    alert("An error occured during signing in, please try later.");
  }
}

// Sign Out
export const SignOut = async () => {
  const auth = getAuth();
  try {
    await signOut(auth);
  } catch(err) {
    console.log(err);
    alert("An error occured during signing out, please try again.");
  }
}