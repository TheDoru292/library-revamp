function Form({ cb }) {
  return (
    <div className="modal-container">
      <span className="close" onClick={() => cb(false)}>
        &times;
      </span>
      <form className="form">
        <span>
          <label htmlFor="title">Book Title:</label>
          <input type="text" name="title" id="title" required />
        </span>
        <span>
          <label htmlFor="author">Book Author:</label>
          <input type="text" name="author" id="author" required />
        </span>
        <span>
          <label htmlFor="pages">Pages:</label>
          <input type="number" name="pages" id="pages" min="1" required />
        </span>
        <span>
          <label htmlFor="read">Read?</label>
          <input type="checkbox" name="read" id="read" />
        </span>
        <button className="form-button" type="submit">
          Add the book
        </button>
      </form>
    </div>
  );
}

export default Form;
