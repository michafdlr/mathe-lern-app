// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "mathetutor-97f4b.firebaseapp.com",
  projectId: "mathetutor-97f4b",
  storageBucket: "mathetutor-97f4b.appspot.com",
  messagingSenderId: "922318796581",
  appId: "1:922318796581:web:95ada6ea5120a5983b8ccc",
  measurementId: "G-DL89BFP00H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const storage = getStorage(app);
