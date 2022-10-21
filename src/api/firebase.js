import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDqOuDO53DXTqvVH8UPe5kjMLYnf5cx0Cw",
  authDomain: "gr-test-84edf.firebaseapp.com",
  projectId: "gr-test-84edf",
  storageBucket: "gr-test-84edf.appspot.com",
  messagingSenderId: "943069434268",
  appId: "1:943069434268:web:9ef01f048e9c99234a7859"
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app);
export const db = getFirestore(app);