import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAYuh6WRwaTu1Q58WePKmmWirwQOybPLUA",
  authDomain: "smartschoolpro-3a08d.firebaseapp.com",
  projectId: "smartschoolpro-3a08d",
  storageBucket: "smartschoolpro-3a08d.firebasestorage.app",
  messagingSenderId: "439246028773",
  appId: "1:439246028773:web:2cb811a5ebc371cc29390c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
