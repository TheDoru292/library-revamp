import { useState } from "react";
import { signIn } from "../App";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function loginFunc(e) {
    e.preventDefault();
    signIn(email, password);
  }

  return (
    <div className="login">
      <form>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            type="email"
            name="email"
            id="email"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={(event) => setPassword(event.target.value)}
            value={password}
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

export default Login;
