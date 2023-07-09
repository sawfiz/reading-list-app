import React, { useContext } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

import styled from 'styled-components';

import { BookDetailsContext } from '../contexts/BookDetailsContext';

import AddBookModal from './AddBookModal';

import addButtonImg from '../images/icons8-add-96.png';

export default function AddBook() {
  const { isAddModalOpen, openAddModal } = useContext(BookDetailsContext);

  const S = {};

  S.Button = styled.button`
    border: none;
  `;

  return (
    <>
      <S.Button
        override
        data-tooltip-id="addBookBtn"
        data-tooltip-content="Add a new book"
        data-tooltip-place="right"
        onClick={openAddModal}
      >
        <img className="addBookImg" src={addButtonImg} alt="" />
      </S.Button>
      {isAddModalOpen && <AddBookModal />}
      <ReactTooltip
        id="addBookBtn"
        style={{
          backgroundColor: 'var(--color-dark)',
          color: '#222',
          fontFamily: 'sans-serif',
        }}
      />
    </>
  );
}
