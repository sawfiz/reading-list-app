import React from 'react';
import Books from './components/Books';
import './App.css';
import Header from './components/Header';
import BooksHeader from './components/BooksHeader';
import BookListContextProvider from './contexts/BookListContext';
import { Auth } from './components/auth';
import { useContext } from 'react';
import { UserContext } from './contexts/UserContext';

export default function App() {
  const {loggedIn} = useContext(UserContext)

  return (
    <div className="app">
      {!loggedIn && <Auth/>}
      {loggedIn && (
          <BookListContextProvider>
            <Header></Header>
            <BooksHeader />
            <Books />
          </BookListContextProvider>
      )}
    </div>
  );
}
