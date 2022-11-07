import { signInAnon } from "../App";
import { Link } from "react-router-dom";

function Screen() {
  return (
    <div>
      <p>You have to log in or register first!</p>
      <Link to="/login">
        <button>Log in</button>
      </Link>
      <Link to="register">
        <button>Register</button>
      </Link>
      <button onClick={signInAnon}>Sign in anonymously</button>
    </div>
  );
}

export default Screen;
