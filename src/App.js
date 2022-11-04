import { useState } from "react";
import Form from "./Form";
import "./style.css";
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirebaseConfig } from "./firebase-config";

// Initialize Firebase
const app = initializeApp(getFirebaseConfig());

const auth = getAuth(app);

function createUser(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("Account created!");
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
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
    });
}

function App() {
  const [clicked, setClicked] = useState(false);
  const [loggedIn, setLoggedIn] = useState();

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
    <div className="App">
      <header className="App-header">
        <h1>The Library</h1>
        {initFirebaseAuth()}
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
  );
}

export default App;
