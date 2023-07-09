import { useState, useEffect, useContext } from 'react';

import Book from './Book';
import EditBookModal from './EditBookModal';
import BookNotesModal from './BookNotesModal';
import { BookListContext } from '../contexts/BookListContext';
import { BookDetailsContext } from '../contexts/BookDetailsContext';

export default function Books() {
  const { bookList, getBooks } = useContext(BookListContext);
  const { isEditModalOpen} = useContext(BookDetailsContext);

  // const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);

  // const editNotes = (book) => {
  //   console.log('Edit notes');
  //   setBookToEdit(book);
  //   openNotesModal();
  // };

  //
  // const openNotesModal = () => {
  //   setIsNotesModalOpen(true);
  // };

  // const closeNotesModal = () => {
  //   setIsNotesModalOpen(false);
  //   getBooks();
  // };

  // Initial randeringx
  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className="books-container">
      {bookList.map((book) => {
        return (
          <Book
            key={book.id}
            book={book}
            // editNotes={editNotes}
          />
        );
      })}
      {/* Use conditional rendering to only render the EditBookModal component within Books 
      when the isOpen condition is satisfied */}
      {isEditModalOpen && <EditBookModal />}
      {/* {isNotesModalOpen && (
        <BookNotesModal
          isOpen={isNotesModalOpen}
          closeModal={closeNotesModal}
          bookToEdit={bookToEdit}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      )} */}
    </div>
  );
}
