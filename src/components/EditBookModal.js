import React, { useContext } from 'react';

import { BookDetailsContext } from '../contexts/BookDetailsContext';

import Modal from 'react-modal';

import styles from './BookDetails.module.css';

Modal.setAppElement('#root'); // Set the root element for the modal

export default function EditBookModal() {
  const { isEditModalOpen, closeEditModal, bookToEdit, handleChange, updateBook } =
    useContext(BookDetailsContext);

  // Function to handle submitting the EditBookModal
  const handleSubmit = (e) => {
    e.preventDefault();
    updateBook();
    closeEditModal();
  };

  return (
    <Modal
    className={styles.modal}
      isOpen={isEditModalOpen}
      onRequestClose={closeEditModal}
    >
      <h2>Edit Book</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputContainer}>
          <label htmlFor="title">
            Title:
            <input
              name="title"
              type="text"
              className={styles.input}
              value={bookToEdit.title}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="author">
            Author:
            <input
              name="author"
              type="text"
              className={styles.input}
              value={bookToEdit.author}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="year">
            Year:
            <input
              name="year"
              type="number"
              className={styles.input}
              value={bookToEdit.year}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className={styles.urlTextContainer}>
          <label htmlFor="url">
            Link:
            <textarea
              id="rul"
              type="text"
              name="url"
              rows="3"
              className={styles.urlText}
              value={bookToEdit.url}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="status">
            Read:
            <select
              id="status"
              name="status"
              className={styles.select}
              value={bookToEdit.status}
              onChange={handleChange}
            >
              <option value="Want to read">Want to read</option>
              <option value="Not started">Not started</option>
              <option value="Reading">Reading</option>
              <option value="Read">Read</option>
              <option value="Re-reading">Re-reading</option>
            </select>
          </label>
        </div>
        <div className={styles.btnContainer}>
            <button className={styles.submitBtn} type="submit">
            Update
          </button>
        </div>
      </form>
    </Modal>
  );
}
