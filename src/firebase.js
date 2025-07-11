import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDWLSlHJH0yqRP_DLtblaNCNCfJOTYoxEM",
  authDomain: "responsibilities-b5c81.firebaseapp.com",
  databaseURL: "https://responsibilities-b5c81-default-rtdb.firebaseio.com",
  projectId: "responsibilities-b5c81",
  storageBucket: "responsibilities-b5c81.appspot.com",
  messagingSenderId: "882652524961",
  appId: "1:882652524961:web:2e064f8f14fe627c821be0"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
