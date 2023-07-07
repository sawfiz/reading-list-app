import { useContext } from 'react';
import { signInWithPopup } from 'firebase/auth';
import styled from 'styled-components';

import { auth, googleProvider } from '../config/firebase';

import { UserContext } from '../contexts/UserContext';

import booksImg from '../images/books.webp';
import googleSignInImg from '../images/btn_google_signin_light_normal_web@2x.png';

export const Auth = () => {
  const { setLoggedIn, setUserId } = useContext(UserContext);

  const signinWithGoogle = async (e) => {
    e.preventDefault();
    try {
      await signInWithPopup(auth, googleProvider);
      setLoggedIn(true);
      setUserId(auth.currentUser.uid);
    } catch (err) {
      console.log('Error');
    }
  };

  const S = {};
  S.LoginPage = styled.div`
    background: #fcf8e8;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  `;

  S.Title = styled.h1`
    font-size: 4rem;
    color: #39232b;
    text-shadow: 2px 2px 4px rgb(0, 0, 0, 0.4);
  `;

  S.SplashImg = styled.img`
    width: 70%;
  `;

  S.PhotoCredit = styled.p`
    font-family: sans-serif;
    color: #aaa;
    font-size: 0.8rem;
  `;

  S.Button = styled.button`
    border: none;
    cursor: pointer;
  `;

  S.SignInImg = styled.img`
    width: 191px;
    height: 46px;
  `;

  return (
    <div>
      <S.LoginPage>
        <S.Title>My Reading List</S.Title>
        <S.SplashImg src={booksImg} alt="WebP Image" />
        <S.PhotoCredit>incomible/Getty Images/iStockphoto</S.PhotoCredit>
        <S.Button onClick={(e) => signinWithGoogle(e)}>
          <S.SignInImg src={googleSignInImg} />
        </S.Button>
      </S.LoginPage>
    </div>
  );
};
