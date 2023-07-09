import React, { useState } from 'react';

import { useContext } from 'react';
import { BookDetailsContext } from '../contexts/BookDetailsContext';

import Modal from 'react-modal';

Modal.setAppElement('#root'); // Set the root element for the modal

export default function AddBookModal() {
  const { isAddModalOpen, addBook, closeAddModal } =
    useContext(BookDetailsContext);

  // Input fields in the form
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    year: 0,
    url: '',
    status: 'wantToRead',
  });
  const { title, author, year, url, status } = formData;

  // State for if there's been change to the form
  const [madeChange, setMadeChange] = useState(false);

 // Function to handle changes in the form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMadeChange(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    addBook(formData);
    closeAddModal();
  };

  // Save user changes even if the modal is dismissed
  const handleModalClose = async () => {
    if (madeChange) {
      addBook(formData);
    }
    closeAddModal();
  };

  return (
    <Modal
      className="book-details-modal"
      isOpen={isAddModalOpen}
      onRequestClose={(e) => handleModalClose()}
    >
      <h2>New Book</h2>
      <form className="book-details-form" onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="title">
            Title:
            <input
              id="title"
              type="text"
              name="title"
              className="book-details-input"
              value={title}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="input-container">
          <label htmlFor="author">
            Author:
            <input
              id="author"
              type="text"
              name="author"
              className="book-details-input"
              value={author}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="input-container">
          <label htmlFor="year">
            Year:
            <input
              id="year"
              type="number"
              name="year"
              className="book-details-input"
              // value={year}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="url-text-container">
          <label htmlFor="url">
            Link:
            <textarea
              className="url-text"
              id="url"
              type="text"
              name="url"
              rows="3"
              value={url}
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
              className="status-select"
              value={status}
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

        <div className="submit-button-container">
          <button className="submit-button" type="submit">
            Add
          </button>
        </div>
      </form>
    </Modal>
  );
}
