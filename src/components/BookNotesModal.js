import React, { useContext } from 'react';

import { BookDetailsContext } from '../contexts/BookDetailsContext';

import Modal from 'react-modal';

import styles from './BookNotes.module.css'

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
      className={styles.modal}
      isOpen={isNotesModalOpen}
      onRequestClose={closeNotesModal}
    >
      <h2>Book Notes</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div>
          <label className={styles.label} htmlFor="lead">
            What led me to this book{' '}
          </label>
          <textarea
            name="lead"
            rows="3"
            cols="60"
            className={styles.textarea}
            value={bookToEdit.lead}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className={styles.dates}>
          <label htmlFor="startDate" className="block-label">
            Start
          </label>
          <input
            name="startDate"
            type="date"
            className={styles.input}
            value={bookToEdit.startDate}
            onChange={handleChange}
          ></input>
          <label htmlFor="finishDate" className="block-label">
            Finish
          </label>
          <input
            name="finishDate"
            type="date"
            className={styles.input}
            value={bookToEdit.finishDate}
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label className={styles.label} htmlFor="notes">
            My notes on this book
          </label>
          <textarea
            name="notes"
            rows="10"
            cols="60"
            className={styles.textarea}
            value={bookToEdit.notes}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className={styles.btnContainer}>
          <button className={styles.submitBtn} type="submit">
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
}
