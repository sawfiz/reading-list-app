import React, { useContext, useState } from 'react';
import AddBookModal from './AddBookModal';
import { BookListContext } from '../contexts/BookListContext';
import addButtonImg from "../images/icons8-add-96.png"


export default function AddBook() {
  const {getBooks} = useContext(BookListContext)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    getBooks();
  };
  
  return (
    <div>
      <button className="addBookButton" onClick={openModal}> <img className="addBookImg" src={addButtonImg} alt="" /></button>
      {isModalOpen && <AddBookModal isOpen={isModalOpen} closeModal={closeModal}/>}
      </div>
  )
}
