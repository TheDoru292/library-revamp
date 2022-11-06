function Home() {
  const [clicked, setClicked] = useState(false);
  const [loggedIn, setLoggedIn] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initFirebaseAuth(handleLogin);
    setLoading(false);
  }, [setLoading]);

  function handleClick(boolean) {
    setClicked(boolean);
  }

  function handleLogin(boolean) {
    setLoggedIn(boolean);
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
        <Screen />
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

export default Home;
