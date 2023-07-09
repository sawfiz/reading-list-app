import React, { useContext } from 'react';
import AddBookModal from './AddBookModal';
import addButtonImg from "../images/icons8-add-96.png"
import { BookDetailsContext } from '../contexts/BookDetailsContext';


export default function AddBook() {
  const {isAddModalOpen, openAddModal} = useContext(BookDetailsContext)
  console.log("🚀 ~ file: AddBook.js:12 ~ AddBook ~ isModalOpen:", isAddModalOpen)
  
  return (
    <div>
      <button className="addBookButton" onClick={openAddModal}> <img className="addBookImg" src={addButtonImg} alt="" /></button>
      {isAddModalOpen && <AddBookModal />}
      </div>
  )
}
