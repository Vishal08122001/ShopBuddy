import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAUAZrop1lMb1Ol6Xt7h2N5wilhewmwxLo",
  authDomain: "netflix-clone-eb6a6.firebaseapp.com",
  projectId: "netflix-clone-eb6a6",
  storageBucket: "netflix-clone-eb6a6.appspot.com",
  messagingSenderId: "995276670110",
  appId: "1:995276670110:web:f8721728e6ffa411b7278f",
  measurementId: "G-CHN1SQT7V9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
