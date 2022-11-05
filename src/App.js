import { useState } from "react";
import Form from "./Form";
import "./style.css";
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
import { useEffect } from "react";
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

function App() {
  const [clicked, setClicked] = useState(false);
  const [loggedIn, setLoggedIn] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initFirebaseAuth();
    setLoading(false);
    console.log(loading);
  }, [setLoading]);

  function handleClick(boolean) {
    setClicked(boolean);
  }

  function initFirebaseAuth() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
  }

  function checkForForm() {
    if (clicked === true) {
      return <Form cb={handleClick} />;
    } else {
      return <button onClick={() => handleClick(true)}>Add a book</button>;
    }
  }

  return (
    <div>
      {loggedIn === false ? (
        <Login />
      ) : (
        <div className="App">
          <header className="App-header">
            <h1>The Library</h1>
            <button onClick={signOutUser}>Sign Out</button>
            <button onClick={createUserLibrary}>Create User Library</button>
          </header>
          <div className="App-content">
            <div className="top">{checkForForm()}</div>
            <div className="rest">
              <table className="table">
                <thead>
                  <tr>
                    <th className="table-title">Book Title</th>
                    <th className="table-author">Author</th>
                    <th className="table-pages">Pages</th>
                    <th>Read</th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
          <div className="App-footer">
            <p>Made by TheDoru</p>
          </div>
        </div>
      )}
    </div>
  );
}

function Login() {
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(text) {
    setEmail(text);
  }

  function handlePassChange(text) {
    setPassword(text);
  }

  function registerFunc(e) {
    e.preventDefault();
    createUser(email, password);
  }

  function loginFunc(e) {
    e.preventDefault();
    signIn(email, password);
  }

  function openRegister() {
    if (register === true) {
      return (
        <div className="password">
          <form>
            <div>
              <label htmlFor="email">Email: </label>
              <input
                onChange={(event) => handleEmailChange(event.target.value)}
                value={email}
                type="email"
                name="email"
                id="email"
              />
            </div>
            <div>
              <label htmlFor="password">Password: </label>
              <input
                onChange={(event) => handlePassChange(event.target.value)}
                value={password}
                type="password"
                name="password"
                id="password"
              />
            </div>
            <div>
              <button onClick={registerFunc}>Register</button>
            </div>
          </form>
        </div>
      );
    }
  }

  function openLogin() {
    if (login === true) {
      return (
        <div className="login">
          <form>
            <div>
              <label htmlFor="email">Email</label>
              <input
                onChange={(event) => handleEmailChange(event.target.value)}
                type="email"
                name="email"
                id="email"
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                onChange={(event) => handlePassChange(event.target.value)}
                type="password"
                name="password"
                id="password"
              />
            </div>
            <div>
              <button onClick={loginFunc}>Login</button>
            </div>
          </form>
        </div>
      );
    }
  }

  return (
    <div>
      {login === false && register === false ? (
        <div>
          <p>You have to log in or register first!</p>
          <button onClick={() => setLogin(true)}>Log in</button>
          <button onClick={() => setRegister(true)}>Register</button>
          <button onClick={signInAnon}>Sign in anonymously</button>
        </div>
      ) : (
        console.log()
      )}
      {openRegister()}
      {openLogin()}
    </div>
  );
}

export default App;
