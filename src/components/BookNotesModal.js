import React, { useContext } from 'react';

import { BookDetailsContext } from '../contexts/BookDetailsContext';

import Modal from 'react-modal';

Modal.setAppElement('#root'); // Set the root element for the modal

export default function BookNotesModal() {
  const { isNotesModalOpen, closeNotesModal, bookToEdit, handleChange, updateBook } =
    useContext(BookDetailsContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateBook();
    closeNotesModal();
  };

  return (
    <Modal
      className="book-notes-modal"
      isOpen={isNotesModalOpen}
      onRequestClose={closeNotesModal}
    >
      <h2>Book Notes</h2>
      <form className="book-notes-form" onSubmit={handleSubmit}>
        <div>
          <label className="block-label" htmlFor="lead">
            What led me to this book{' '}
          </label>
          <textarea
            name="lead"
            rows="3"
            cols="60"
            className="notes-textarea"
            value={bookToEdit.lead}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="notes-dates">
          <label htmlFor="startDate" className="block-label">
            Start
          </label>
          <input
            name="startDate"
            type="date"
            className="date-input"
            value={bookToEdit.startDate}
            onChange={handleChange}
          ></input>
          <label htmlFor="finishDate" className="block-label">
            Finish
          </label>
          <input
            name="finishDate"
            type="date"
            className="date-input"
            value={bookToEdit.finishDate}
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label className="block-label" htmlFor="notes">
            My notes on this book
          </label>
          <textarea
            name="notes"
            rows="10"
            cols="60"
            className="notes-textarea"
            value={bookToEdit.notes}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="submit-button-container">
          <button className="submit-button" type="submit">
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
}
