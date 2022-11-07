import { useState } from "react";
import { createUser } from "../App";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function registerFunc(e) {
    e.preventDefault();
    createUser(email, password);
  }

  return (
    <div className="password">
      <form>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            type="email"
            name="email"
            id="email"
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            onChange={(event) => setPassword(event.target.value)}
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

export default Register;
