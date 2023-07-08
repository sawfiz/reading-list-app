import React, { useContext, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { auth } from './config/firebase';

import BookListContextProvider from './contexts/BookListContext';
import { UserContext } from './contexts/UserContext';
import BookDetailsContextProvider from './contexts/BookDetailsContext';

import { Auth } from './components/Auth';
import Header from './components/Header';
import Books from './components/Books';
import BooksHeader from './components/BooksHeader';
import Footer from './components/Footer';

import './App.css';

export default function App() {
  const { loggedIn, setLoggedIn, setUserId } = useContext(UserContext);
  const navigate = useNavigate();

  // Keep user logged in after a page refresh
  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in
        setLoggedIn(true);
        setUserId(user.uid);
        navigate('/books');
      } else {
        // User is logged out
        setLoggedIn(false);
        setUserId('');
        navigate('/');
      }
    });
    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <div className="app">
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route
            path="/books"
            element={
              loggedIn && (
                <BookListContextProvider>
                  <BookDetailsContextProvider>
                    <Header />
                    <BooksHeader />
                    <Books />
                  </BookDetailsContextProvider>
                </BookListContextProvider>
              )
            }
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
