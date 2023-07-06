import React, { useState } from 'react';
import Modal from 'react-modal';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../config/firebase';

Modal.setAppElement('#root'); // Set the root element for the modal

export default function AddBookModal({ isOpen, closeModal }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    year: 0,
    url: '',
    status: 'wantToRead',
  });

  const { title, author, year, url, status } = formData;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData((prevData) => ({ ...prevData, [name]: newValue }));
  };

  const handleSubmit = async (e) => {
    console.log('Add button clicked');
    e.preventDefault();

    try {
      const bookData = { title, author, year, status };
      console.log(
        '🚀 ~ file: AddBookModal.js:30 ~ handleSubmit ~ bookData:',
        bookData
      );
      await addDoc(collection(db, 'books'), bookData);
      closeModal(); // Close the modal after successfully adding the book
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <Modal
      className="book-details-modal"
      isOpen={isOpen}
      onRequestClose={closeModal}
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
              className='book-details-input'
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
              className='book-details-input'
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
              className='book-details-input'
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
            <select id="status" className='status-select'>
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
