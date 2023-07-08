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
    height: calc(100vh - 1rem);
    background: #fcf8e8;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  `;

  S.Title = styled.h1`
    /* background: #b0bfad; */
    padding: 0 1.5rem;
    text-decoration: underline;
    font-size: clamp(2.5rem, 5vw, 4rem);
    color: #39232b;
    text-shadow: 2px 2px 4px rgb(0, 0, 0, 0.4);
  `;

  S.SignInImg = styled.img`
    width: 191px;
    height: 46px;
  `;

  S.SplashImgContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `;

  S.SplashImg = styled.img`
    width: clamp(300px, 70%, 600px);
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

  return (
    <div>
      <S.LoginPage>
        <S.Title>My Reading List</S.Title>
        <S.Button onClick={(e) => signinWithGoogle(e)}>
          <S.SignInImg src={googleSignInImg} />
        </S.Button>
        <S.SplashImgContainer>
          <S.SplashImg src={booksImg} alt="WebP Image" />
          <S.PhotoCredit>incomible/Getty Images/iStockphoto</S.PhotoCredit>
        </S.SplashImgContainer>
      </S.LoginPage>
    </div>
  );
};
