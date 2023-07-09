import { useContext, useState } from 'react';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import styled from 'styled-components';

import { db } from '../config/firebase';

import { BookListContext } from '../contexts/BookListContext';
import { UserContext } from '../contexts/UserContext';
import { BookDetailsContext } from '../contexts/BookDetailsContext';

import BookStatus from './BookStatus';

export default function Book({ book }) {
  const { editBook, editNotes } = useContext(BookDetailsContext);

  const { userId } = useContext(UserContext);
  const { getBooks } = useContext(BookListContext);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleChangeStatus = async (id, status) => {
    const bookDoc = doc(db, 'users', userId, 'books', id);
    await updateDoc(bookDoc, { status });
    getBooks();
  };

  const deleteBook = async (id) => {
    const bookDoc = doc(db, 'users', userId, 'books', id);
    await deleteDoc(bookDoc);
    getBooks();
  };

  const isNotes = book.lead || book.startDate || book.finishDate || book.notes;

  const S = {};
  S.Book = styled.div`
    display: grid;
    grid-template-columns: 35% 27% 10% 17% 3% 8%;
    padding: 0.4rem 0.5rem;
    font-family: 'Architects Daughter';
    border-bottom: 1px dotted darkgrey;

    /* A book that's an even child of it's parent has an alternative color */
    &:nth-child(even) {
      background-color: #cee5d0;
    }
    &:hover {
      background-color: var(--color-highlight);
    }
  `;

  S.Year = styled.div`
    font-family: sans-serif;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    text-align: right;
  `;

  S.Button = styled.button`
    cursor: pointer;
  `;

  S.Buttons = styled.div`
    display: flex;
    margin-left: 0.7rem;
    gap: 0.5rem;
  `;

  return (
    <S.Book onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div>
        <a href={book.url} target="_blank" rel="noopener noreferrer">
          {book.title}
        </a>
      </div>
      <div>{book.author}</div>
      <S.Year>{book.year}</S.Year>
      <BookStatus
        book={book}
        handleChangeStatus={handleChangeStatus}
      ></BookStatus>
      <S.Button onClick={() => editNotes(book)}>
        {isNotes ? '📝' : '🗒️'}
      </S.Button>
      {isHovered && (
        <S.Buttons>
          <S.Button onClick={() => editBook(book)}>✍️</S.Button>
          <S.Button onClick={() => deleteBook(book.id)}>🗑️</S.Button>
        </S.Buttons>
      )}
    </S.Book>
  );
}
