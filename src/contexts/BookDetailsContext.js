import React, { createContext, useState, useContext } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

import { UserContext } from '../contexts/UserContext';
import { BookListContext } from '../contexts/BookListContext';

export const BookDetailsContext = createContext();

export default function BookDetailsContextProvider(props) {
  const { userId } = useContext(UserContext);
  const { getBooks } = useContext(BookListContext);

  const [bookToEdit, setBookToEdit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Set booToEdit when a book's edit button is clicked
  const editBook = (book) => {
    setBookToEdit(book);
    openModal();
  };

  const updateBook = async () => {
    try {
      const bookDoc = doc(db, 'users', userId, 'books', bookToEdit.id);
      const bookData = { ...bookToEdit };
      await updateDoc(bookDoc, bookData);
      // closeNotesModal();
    } catch (error) {
      console.error('Error editing book:', error);
    }
  };

  // Function to handle changes in the EditBookModal
  const handleChange = (e) => {
    setBookToEdit({ ...bookToEdit, [e.target.name]: e.target.value });
  };

  // Function to handle submitting the EditBookModal
  const handleSubmit = async (e) => {
    e.preventDefault();
    updateBook();
    closeModal(); // Close the modal after successfully adding the book
  };

  const openModal = () => {
    setIsModalOpen(true);

  };

  const closeModal = () => {
    setIsModalOpen(false);
    getBooks();
  };

  return (
    <BookDetailsContext.Provider
      value={{isModalOpen, closeModal, bookToEdit, handleChange, handleSubmit, setBookToEdit, editBook}}
    >
      {props.children}
    </BookDetailsContext.Provider>
  );
}
