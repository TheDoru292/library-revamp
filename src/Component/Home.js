import { useState, useEffect } from "react";
import { getUserLibrary, updateUserLibrary } from "../App";
import Form from "./Form";
import Screen from "./Screen";
import TableItem from "./TableItem";

function Home(props) {
  const [clicked, setClicked] = useState(false);
  const [library, setLibrary] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getDataAndShowItems() {
      let data = await getUserLibrary();
      setLibrary(data.library);
      setLoading(false);
    }
    if (props.loggedIn === true) {
      getDataAndShowItems();
    }
  }, [setLibrary, props.loggedIn]);

  function handleClick(boolean) {
    setClicked(boolean);
  }

  function addToLibrary(obj) {
    let value = [...library];
    value.push(obj);
    setLibrary(value);
  }

  function checkForForm() {
    if (clicked === true) {
      return (
        <Form cb={handleClick} library={library} addToLibrary={addToLibrary} />
      );
    } else {
      return <button onClick={() => handleClick(true)}>Add a book</button>;
    }
  }

  function deleteItem(getItem) {
    if (library.length === 1) {
      setLibrary([]);
      updateUserLibrary([]);
    } else {
      let newArray = library.filter((item) => item.id !== getItem.id);
      setLibrary(newArray);
      updateUserLibrary(library);
    }
  }

  function editItem(gotItem, value) {
    setLibrary(
      library.map((item) => {
        if (item.id === gotItem.id) {
          return {
            ...item,
            read: value,
          };
        }

        return item;
      })
    );

    updateUserLibrary(library);
  }

  return (
    <div className="App-content">
      {props.loggedIn === false ? (
        <Screen />
      ) : (
        <div>
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
              <tbody>
                {loading === true
                  ? console.log()
                  : library.map((item) => {
                      return (
                        <TableItem
                          item={item}
                          editItem={editItem}
                          deleteItem={deleteItem}
                        />
                      );
                    })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
