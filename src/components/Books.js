import { useState, useEffect, useContext } from 'react';

import Book from './Book';
import EditBookModal from './EditBookModal';
import BookNotesModal from './BookNotesModal';
import { BookListContext } from '../contexts/BookListContext';
import { BookDetailsContext } from '../contexts/BookDetailsContext';

export default function Books() {
  const { bookList, getBooks } = useContext(BookListContext);
  const { isEditModalOpen, isNotesModalOpen } = useContext(BookDetailsContext);

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
      {/* Conditional rendering of the modals */}
      {isEditModalOpen && <EditBookModal />}
      {isNotesModalOpen && <BookNotesModal />}
    </div>
  );
}
