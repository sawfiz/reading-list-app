import React, { createContext, useState } from 'react';
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';

export const BookListContext = createContext();

export default function BookListContextProvider(props) {
  const [bookList, setBookList] = useState([]);
  const [sortDirections, setSortDirections] = useState({
    title: true,
    author: true,
    pages: true,
    isRead: true,
  });

  const booksCol = collection(db, 'books');

  const sortArray = (array, key, dir) => {
    array.sort((a, b) => {
      // Sort strings
      if (key === 'title' || key === 'author' || key === "status") {
        return dir
          ? a[key].localeCompare(b[key])
          : b[key].localeCompare(a[key]);
      }
      // Sort numbers
      if (key === 'year') {
        return dir ? a[key] - b[key] : b[key] - a[key];
      }
      // Sort boolean
      // if (key === 'isRead') {
      //   return dir ? (a[key] ? -1 : 1) : a[key] ? 1 : -1;
      // }
    });
  };

  const getBooks = async (key = 'title', toggleSort=false) => {
    // Default is to sort by title
    try {
      const data = await getDocs(booksCol);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      const newSortDirections = { ...sortDirections };
      if (toggleSort) {newSortDirections[key] = !newSortDirections[key];}
      setSortDirections(newSortDirections);
      sortArray(filteredData, key, newSortDirections[key]);

      setBookList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <BookListContext.Provider value={{ bookList, getBooks }}>
      {props.children}
    </BookListContext.Provider>
  );
}
