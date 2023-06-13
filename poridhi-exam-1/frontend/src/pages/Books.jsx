import React, { useEffect, useState } from "react";
import axios from "axios";

const Books = () => {
  const [Books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http:127.0.0.1:8899/books");
        setBooks(res.data());
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  return <h1>Nazmul book shop</h1>;
};

export default Books;
