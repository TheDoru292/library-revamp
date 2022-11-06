import { useState } from "react";

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

export default Login;
