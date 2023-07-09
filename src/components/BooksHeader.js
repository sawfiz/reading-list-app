import React, { useContext } from 'react';
import styled from 'styled-components';
import { BookListContext } from '../contexts/BookListContext';

export default function BooksHeader() {
  const { getBooks } = useContext(BookListContext);
  const toggleSort = true;

  const S = {};
  S.BookHeader = styled.div`
    display: grid;
    grid-template-columns: 35% 27% 10% 17% 3% 8%;
    width: 95%;
    margin: auto;
    font-family: sans-serif;
    background: var(--color-list-header);
    font-size: 1.1rem;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.4);
    text-align: left;
    padding: 0.3rem 0.5rem;
  `;

  return (
    <S.BookHeader>
      <div>
        Title <button onClick={() => getBooks('title', toggleSort)}>↕️</button>
      </div>
      <div>
        Author
        <button onClick={() => getBooks('author', toggleSort)}>↕️</button>
      </div>
      <div>
        Year <button onClick={() => getBooks('year', toggleSort)}>↕️</button>
      </div>
      <div>
        Status
        <button onClick={() => getBooks('status', toggleSort)}>↕️</button>
      </div>
    </S.BookHeader>
  );
}
