import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCVWesmPhReYdMdyEJjnZ9rhoqrZC2NsRs",
  authDomain: "astro-firebase-auth-8fe73.firebaseapp.com",
  projectId: "astro-firebase-auth-8fe73",
  storageBucket: "astro-firebase-auth-8fe73.appspot.com",
  messagingSenderId: "879440963789",
  appId: "1:879440963789:web:8b3f801ccb410a2b1d6184",
  measurementId: "G-YHXK0YZW7N",
};

export const app = initializeApp(firebaseConfig);
export const projectAuth = getAuth(app);
