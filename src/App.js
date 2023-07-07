import React, { useContext, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { auth } from './config/firebase';

import BookListContextProvider from './contexts/BookListContext';
import { UserContext } from './contexts/UserContext';

import { Auth } from './components/Auth';
import Header from './components/Header';
import Books from './components/Books';
import BooksHeader from './components/BooksHeader';

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
        navigate('/books')
      } else {
        // User is logged out
        setLoggedIn(false);
        setUserId('');
        navigate('/')
      }
    });
    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={<Auth />}
        />
        <Route
          path="/books"
          element={
            loggedIn && (
              <BookListContextProvider>
                <Header />
                <BooksHeader />
                <Books />
              </BookListContextProvider>
            ) 
          }
        />
      </Routes>
    </div>
  );
}
