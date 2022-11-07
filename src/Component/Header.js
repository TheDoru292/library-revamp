import { signOutUser } from "../App";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="App-header">
      <div className="heading">
        <Link to="/">
          <h1
            style={
              props.loggedIn === true
                ? { marginLeft: 100 + "px" }
                : { marginLeft: 0 }
            }
          >
            The Library
          </h1>
        </Link>
      </div>
      {props.loggedIn === false ? (
        console.log()
      ) : (
        <div className="button">
          <button onClick={signOutUser}>Sign Out</button>
        </div>
      )}
    </header>
  );
}

export default Header;
