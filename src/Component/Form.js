import { useState } from "react";
import { updateUserLibrary } from "../App";
const uniqid = require("uniqid");

function Form({ cb, library, addToLibrary }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pages, setPages] = useState("");
  const [read, setRead] = useState(false);

  return (
    <div className="modal-container">
      <span className="close" onClick={() => cb(false)}>
        &times;
      </span>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          let item = {
            title: title,
            author: author,
            pages: pages,
            read: read,
            id: uniqid(),
          };

          let array = [...library, item];

          addToLibrary(item);
          updateUserLibrary(array);
        }}
      >
        <span>
          <label htmlFor="title">Book Title:</label>
          <input
            onChange={(event) => setTitle(event.target.value)}
            value={title}
            type="text"
            name="title"
            id="title"
            required
          />
        </span>
        <span>
          <label htmlFor="author">Book Author:</label>
          <input
            onChange={(event) => setAuthor(event.target.value)}
            value={author}
            type="text"
            name="author"
            id="author"
            required
          />
        </span>
        <span>
          <label htmlFor="pages">Pages:</label>
          <input
            onChange={(event) => setPages(event.target.value)}
            value={pages}
            type="number"
            name="pages"
            id="pages"
            min="1"
            required
          />
        </span>
        <span>
          <label htmlFor="read">Read?</label>
          <input
            onChange={(event) => setRead(event.target.checked)}
            value={read}
            type="checkbox"
            name="read"
            id="read"
          />
        </span>
        <button className="form-button" type="submit">
          Add the book
        </button>
      </form>
    </div>
  );
}

export default Form;
