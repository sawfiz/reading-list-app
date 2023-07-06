import { useState, useEffect, useContext } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import Book from './Book';
import EditBookModal from './EditBookModal';
import BookNotesModal from './BookNotesModal';
import { BookListContext } from '../contexts/BookListContext';

export default function Books() {
  const { bookList, getBooks } = useContext(BookListContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
  const [bookToEdit, setBookToEdit] = useState(null);

  // Set booToEdit when a book's edit button is clicked
  const editBook = (book) => {
    setBookToEdit(book);
    openModal();
  };

  const editNotes = (book) => {
    console.log("Edit notes");
    setBookToEdit(book);
    openNotesModal();
  };

  // Function to handle changes in the EditBookModal
  const handleChange = (e) => {
    setBookToEdit({ ...bookToEdit, [e.target.name]: e.target.value });
  };

  // Function to handle submitting the EditBookModal
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const bookDoc = doc(db, 'books', bookToEdit.id);
      const bookData = { ...bookToEdit };
      await updateDoc(bookDoc, bookData);
      closeModal(); // Close the modal after successfully adding the book
      closeNotesModal();
    } catch (error) {
      console.error('Error editing book:', error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    getBooks();
  };

  // 
  const openNotesModal = () => {
    setIsNotesModalOpen(true);
  };

  const closeNotesModal = () => {
    setIsNotesModalOpen(false);
    getBooks();
  };

  // Initial randeringx
  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className="books-container">
      {bookList.map((book) => {
        return <Book key={book.id} book={book} editBook={editBook} editNotes={editNotes}/>;
      })}
      {/* Use conditional rendering to only render the EditBookModal component within Books 
      when the isOpen condition is satisfied */}
      {isModalOpen && (
        <EditBookModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          bookToEdit={bookToEdit}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      )}
      {isNotesModalOpen && (
        <BookNotesModal
          isOpen={isNotesModalOpen}
          closeModal={closeNotesModal}
          bookToEdit={bookToEdit}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
