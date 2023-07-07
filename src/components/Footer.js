import React from 'react';
import { FaGithub } from 'react-icons/fa';
import styled from 'styled-components';

export default function Footer() {
  const S = {};
  S.Footer = styled.div`
    position: absolute;
    bottom: 0;
    width: 100vw;
    color: white;
    background-color: #333;
    font-size: 0.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  S.GitHub = styled.a`
    color: white;
  `;

  return (
    <S.Footer>
      <p>
        Copyright © 2023 sawfiz{' '}
        <S.GitHub
          href="https://github.com/sawfiz"
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub />
        </S.GitHub>
      </p>
    </S.Footer>
  );
}
