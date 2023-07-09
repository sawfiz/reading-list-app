import { useEffect, useContext } from 'react';
import styled from 'styled-components';

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

  const S = {};
  S.BoosContainer = styled.div`
    background: var(--color-light);
    width: 95%;
    margin: auto;
    margin-top: 0.3rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
  `;

  return (
    <S.BoosContainer>
      {bookList.map((book) => {
        return (
          <Book
            key={book.id}
            book={book}
          />
        );
      })}
      {/* Conditional rendering of the modals */}
      {isEditModalOpen && <EditBookModal />}
      {isNotesModalOpen && <BookNotesModal />}
    </S.BoosContainer>
  );
}
