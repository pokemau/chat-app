import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBOEMDWW-pQf6nghWBThm_y_PpAtfCBmhk",
  authDomain: "rc-bot-2b830.firebaseapp.com",
  projectId: "rc-bot-2b830",
  storageBucket: "rc-bot-2b830.appspot.com",
  messagingSenderId: "580067608589",
  appId: "1:580067608589:web:8b11140ff124d0885a6d44",
  measurementId: "G-0ZEGZXMK5F",
};

const app = initializeApp(firebaseConfig);

//auth
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

// firestore
export const db = getFirestore(app);
