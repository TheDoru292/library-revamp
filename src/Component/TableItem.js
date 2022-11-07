import { useState } from "react";

function TableItem({ item, editItem, deleteItem }) {
  const [show, setShow] = useState(false);

  return (
    <tr key={item.id}>
      <td
        className="item-title-stuff"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        <p className="item-title">{item.title}</p>
        <span
          className={
            show === false ? "item-buttons hidden" : "item-buttons show"
          }
        >
          <p
            onClick={() => {
              let value = item.read === false ? true : false;

              editItem(item, value);
            }}
          >
            edit
          </p>
          <p onClick={() => deleteItem(item)}>delete</p>
        </span>
      </td>
      <td>{item.author}</td>
      <td>{item.pages}</td>
      <td>{item.read === false ? "No" : "Yes"}</td>
    </tr>
  );
}

export default TableItem;
