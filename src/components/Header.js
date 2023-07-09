import React from 'react';
import { useContext } from 'react';
import styled from 'styled-components';

import { auth } from '../config/firebase';

import { UserContext } from '../contexts/UserContext';

import AddBook from './AddBook';
import { signOut } from 'firebase/auth';

export default function Header() {
  const { setLoggedIn } = useContext(UserContext);
  const user = auth.currentUser;

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setLoggedIn(false);
    } catch (err) {
      console.log('Error signing out');
    }
  };

  const S = {};

  S.Header = styled.header``;

  S.H1 = styled.h1`
    font-family: 'Architects Daughter';
    text-align: center;
    padding-top: 1.5rem;
    font-size: clamp(1.3rem, 3vw, 3rem);
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  `;

  S.Navbar = styled.div`
    width: 95%;
    display: flex;
    margin: auto;
    justify-content: space-between;
    align-items: end;
    margin-bottom: 0.5rem;
  `;

  S.Google = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
  `;

  S.Avatar = styled.img`
    width: 2rem;
    height: 2ram;
    border-radius: 50%;
    border: 1px solid lightgray;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  `;

  S.SignOut = styled.button`
    border: none;
    background: none;
    cursor: pointer;
    font-weight: bold;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);

    &:hover {
      /* transform: scale(1.2); */
      color: red;
    }
  `;

  return (
    <S.Header>
      <S.H1>My Reading List</S.H1>
      <S.Navbar>
        <AddBook />
        <form>
          <input placeholder="Search"></input>
        </form>
        <S.Google>
          <S.Avatar src={user.photoURL} alt="Avatar" />
          <S.SignOut onClick={handleSignOut}> Sign Out </S.SignOut>
        </S.Google>
      </S.Navbar>
    </S.Header>
  );
}
