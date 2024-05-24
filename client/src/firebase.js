// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE,
  authDomain: "myapp-d6d33.firebaseapp.com",
  projectId: "myapp-d6d33",
  storageBucket: "myapp-d6d33.appspot.com",
  messagingSenderId: "340142463610",
  appId: "1:340142463610:web:dccbaf4d1ccd907da9b9c3"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);