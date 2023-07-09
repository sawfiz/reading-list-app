import React, { createContext, useState, useContext } from 'react';
import { collection, doc, addDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

import { UserContext } from '../contexts/UserContext';
import { BookListContext } from '../contexts/BookListContext';

export const BookDetailsContext = createContext();

export default function BookDetailsContextProvider(props) {
  const { userId } = useContext(UserContext);
  const { getBooks } = useContext(BookListContext);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [bookToEdit, setBookToEdit] = useState(null);

  // Function to open/close the AddBookModal
  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
    getBooks();
  };

  const addBook = async (bookData) => {
    try {
      await addDoc(collection(db, 'users', userId, 'books'), bookData);
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  // Function to open/close the EditBookModal
  const openEditModal = () => {
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    getBooks();
  };

  // Set bookToEdit when a book's edit button is clicked
  const editBook = (book) => {
    setBookToEdit(book);
    openEditModal();
  };

  // Function to handle changes in the EditBookModal
  const handleChange = (e) => {
    setBookToEdit({ ...bookToEdit, [e.target.name]: e.target.value });
  };

  const updateBook = async () => {
    try {
      const bookDoc = doc(db, 'users', userId, 'books', bookToEdit.id);
      const bookData = { ...bookToEdit };
      await updateDoc(bookDoc, bookData);
    } catch (error) {
      console.error('Error editing book:', error);
    }
  };

  return (
    <BookDetailsContext.Provider
      value={{
        isAddModalOpen,
        openAddModal,
        closeAddModal,
        addBook,
        isEditModalOpen,
        openEditModal,
        closeEditModal,
        updateBook,
        bookToEdit,
        setBookToEdit,
        handleChange,
        editBook,
      }}
    >
      {props.children}
    </BookDetailsContext.Provider>
  );
}
