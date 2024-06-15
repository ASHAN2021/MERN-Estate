// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-3fe5a.firebaseapp.com",
  projectId: "mern-estate-3fe5a",
  storageBucket: "mern-estate-3fe5a.appspot.com",
  messagingSenderId: "294731212719",
  appId: "1:294731212719:web:10415822b83cda9f98715a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);