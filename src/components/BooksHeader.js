import React, { useContext } from 'react';
import { BookListContext } from '../contexts/BookListContext';

export default function BooksHeader() {
  const { getBooks } = useContext(BookListContext);
  const toggleSort = true;
  return (
    <div className="books-header">
      <div>
        Title <button onClick={() => getBooks('title', toggleSort)}>↕️</button>
      </div>
      <div>
        Author <button onClick={() => getBooks('author', toggleSort)}>↕️</button>
      </div>
      <div>
        Year <button onClick={() => getBooks('year', toggleSort)}>↕️</button>
      </div>
      <div>
        Status <button onClick={() => getBooks('status', toggleSort)}>↕️</button>
      </div>
    </div>
  );
}
