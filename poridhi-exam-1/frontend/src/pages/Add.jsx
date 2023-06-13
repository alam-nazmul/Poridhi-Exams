import axios from "axios";
import React, { useState } from "react";
import Books from "./Books";

const Add = () => {
  const [book, setBooks] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });

  const handleChange = (e) => {
    setBooks((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8899/books", Books);
    } catch (err) {}
  };

  return (
    <div calssName="form">
      <h1>Add new books</h1>
      <input
        type="text"
        placeholder="title"
        onChange={handleChange}
        name="title"
      />
      <input
        type="text"
        placeholder="desc"
        onChange={handleChange}
        name="desc"
      />
      <input
        type="number"
        placeholder="price"
        onChange={handleChange}
        name="price"
      />
      <input
        type="text"
        placeholder="cover"
        onChange={handleChange}
        name="cover"
      />
      <button onClick={handleClick}>Add</button>
    </div>
  );
};

export default Add;
