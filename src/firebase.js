import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInAnonymously,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirebaseConfig } from "./firebase-config";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  setDoc,
} from "firebase/firestore";

// Initialize Firebase
const app = initializeApp(getFirebaseConfig());

const auth = getAuth(app);

const db = getFirestore(app);

function createUser(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("Account created!");
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
}

function signIn(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
}

function signOutUser() {
  signOut(auth);
}

function signInAnon() {
  signInAnonymously(auth)
    .then(() => {
      console.log("Signed!");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

function getUserLibrary() {}

async function createUserLibrary() {
  try {
    const user = auth.currentUser;
    const docRef = await setDoc(doc(db, "library", user.uid), {
      test: "test",
    });

    console.log("Document written with ID: ", docRef);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

function initFirebaseAuth({ cb }) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      cb(true);
    } else {
      cb(false);
    }
  });
}

export { initFirebaseAuth };
