import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCdDeukRooA3tcbSEOh0CVp9bR9c-pwoAM",
  authDomain: "excelviewer-e6298.firebaseapp.com",
  projectId: "excelviewer-e6298",
  storageBucket: "excelviewer-e6298.appspot.com",
  messagingSenderId: "798021124921",
  appId: "1:798021124921:web:67d5068abf1a6b0465dee8",
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
