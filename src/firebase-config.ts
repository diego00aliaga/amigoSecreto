 // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmWdkH9_Jg-bZ3yUGvXfSgluPha06547k",
  authDomain: "amigosecreto-55774.firebaseapp.com",
  projectId: "amigosecreto-55774",
  storageBucket: "amigosecreto-55774.firebasestorage.app",
  messagingSenderId: "847339026330",
  appId: "1:847339026330:web:ba54c8f5bbcffa673a6c23",
  measurementId: "G-PC53Y4MB2E"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);