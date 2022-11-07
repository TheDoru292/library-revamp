import "./style.css";
import { useState } from "react";
import { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./Component/Home";
import Login from "./Component/Login";
import Register from "./Component/Register";
import Header from "./Component/Header";
import Footer from "./Component/Footer";
import { initializeApp } from "firebase/app";
import { getFirebaseConfig } from "./firebase-config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInAnonymously,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  doc,
  getFirestore,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

const app = initializeApp(getFirebaseConfig());
const auth = getAuth(app);
const db = getFirestore();

function createUser(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("Account created!", userCredential.user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
}

function signIn(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {})
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
      console.log(errorCode, errorMessage);
    });
}

async function updateUserLibrary(array) {
  const user = auth.currentUser;
  const docRef = doc(db, "library", user.uid);

  await updateDoc(docRef, {
    library: array,
  });
}

async function getUserLibrary() {
  const user = auth.currentUser;
  const docRef = doc(db, "library", user.uid);
  const docSnap = getDoc(docRef);

  if ((await docSnap).exists()) {
    return (await docSnap).data();
  } else {
    createUserLibrary();
  }
}

async function createUserLibrary() {
  try {
    const user = auth.currentUser;
    const docRef = await setDoc(doc(db, "library", user.uid), {
      library: [],
    });

    console.log("Document written with ID: ", docRef);

    getUserLibrary();
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    async function init() {
      await initFirebaseAuth();
    }

    init();
  });

  function initFirebaseAuth() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        handleSomething(true);
      } else {
        handleSomething(false);
      }
    });
  }

  function handleSomething(boolean) {
    setLoggedIn(boolean);
  }

  useEffect(() => {
    initFirebaseAuth();
  });

  return (
    <div className="App">
      <Header loggedIn={loggedIn} />

      <Routes>
        <Route path="/" element={<Home loggedIn={loggedIn} />} />
        <Route
          path="/login"
          element={loggedIn ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="/register"
          element={loggedIn ? <Navigate to="/" replace /> : <Register />}
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
export {
  createUser,
  signIn,
  signInAnon,
  getUserLibrary,
  signOutUser,
  updateUserLibrary,
};
