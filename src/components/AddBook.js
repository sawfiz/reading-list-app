import React, { useContext } from 'react';

import { BookDetailsContext } from '../contexts/BookDetailsContext';

import AddBookModal from './AddBookModal';

import addButtonImg from '../images/icons8-add-96.png';

export default function AddBook() {
  const { isAddModalOpen, openAddModal } = useContext(BookDetailsContext);

  return (
    <div>
      <button className="addBookButton" onClick={openAddModal}>
        <img className="addBookImg" src={addButtonImg} alt="" />
      </button>
      {isAddModalOpen && <AddBookModal />}
    </div>
  );
}
