import { useContext, useState } from 'react';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { BookListContext } from '../contexts/BookListContext';
import BookStatus from './BookStatus';

export default function Book({ book, editBook, editNotes }) {
  const { getBooks } = useContext(BookListContext);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleChangeStatus = async (id, status) => {
    const bookDoc = doc(db, 'books', id);
    await updateDoc(bookDoc, { status });
    getBooks();
  };

  const deleteBook = async (id) => {
    const bookDoc = doc(db, 'books', id);
    await deleteDoc(bookDoc);
    getBooks();
  };

  const isNotes = book.lead || book.startDate || book.finishDate || book.notes;

  return (
    <div
      className="book"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div>
        <a href={book.url} target="_blank" rel="noopener noreferrer">
          {book.title}
        </a>
      </div>
      <div>{book.author}</div>
      <div className='year'>{book.year}</div>
      <BookStatus
        book={book}
        handleChangeStatus={handleChangeStatus}
      ></BookStatus>
      <div className="right">
        <button className="notes-button" onClick={() => editNotes(book)}>
          {' '}
          {isNotes ? '📝' : '🗒️'}
        </button>
      </div>
      {isHovered && (
        <div className="buttons">
          <button className="edit-button" onClick={() => editBook(book)}>
            ✍️
          </button>
          <button className="delete-button" onClick={() => deleteBook(book.id)}>
            🗑️
          </button>
        </div>
      )}
    </div>
  );
}
