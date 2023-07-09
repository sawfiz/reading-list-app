import React, { useContext } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

import { BookDetailsContext } from '../contexts/BookDetailsContext';

import AddBookModal from './AddBookModal';

import addButtonImg from '../images/icons8-add-96.png';

export default function AddBook() {
  const { isAddModalOpen, openAddModal } = useContext(BookDetailsContext);

  return (
    <div>
      <button
        data-tooltip-id="addBookBtn"
        data-tooltip-content="Add a new book"
        data-tooltip-place="right"
        onClick={openAddModal}
      >
        <img className="addBookImg" src={addButtonImg} alt="" />
      </button>
      {isAddModalOpen && <AddBookModal />}
      <ReactTooltip id="addBookBtn" />
    </div>
  );
}
