import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC3FJ2XWwxvEjhEg528D91qnavZhq293iA",
  authDomain: "keyboardwarrior-8319e.firebaseapp.com",
  projectId: "keyboardwarrior-8319e",
  storageBucket: "keyboardwarrior-8319e.appspot.com",
  messagingSenderId: "1072198139180",
  appId: "1:1072198139180:web:16375ac1131f4319908089",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth();
