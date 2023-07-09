import React from 'react';
import styled from 'styled-components';

export default function BookStatus({ book, handleChangeStatus }) {
  const S = {};
  S.BookStatus = styled.select`
    background: #0000;
    border: none;
    outline: none;
    text-align: center;
  `;

  return (
    <>
      <S.BookStatus
        className="book-status"
        value={book.status}
        onChange={(e) => handleChangeStatus(book.id, e.target.value)}
      >
        <option value="Want to read">Want to read</option>
        <option value="Not started">Not started</option>
        <option value="Reading">Reading</option>
        <option value="Read">Read</option>
        <option value="Re-reading">Re-reading</option>
      </S.BookStatus>
    </>
  );
}
