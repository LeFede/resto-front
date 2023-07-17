// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOxgCu6uO0vwtx6BMj__8k_5h9Teqq2ek",
  authDomain: "fir-auth-backend-f02d8.firebaseapp.com",
  projectId: "fir-auth-backend-f02d8",
  storageBucket: "fir-auth-backend-f02d8.appspot.com",
  messagingSenderId: "463091393035",
  appId: "1:463091393035:web:998790eec34910c4cb5d0e",
  measurementId: "G-LXS66PTYM7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app