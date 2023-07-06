import React from 'react';

export default function BookStatus({ book, handleChangeStatus }) {
  return (
    <div>
        <select className="book-status" value={book.status} onChange={(e)=>handleChangeStatus(book.id, e.target.value)}>
          <option value="Want to read">Want to read</option>
          <option value="Not started">Not started</option>
          <option value="Reading">Reading</option>
          <option value="Read">Read</option>
          <option value="Re-reading">Re-reading</option>
        </select>
    </div>
  );
}
