import React from 'react';
import Books from './components/Books';
import './App.css';
import Header from './components/Header';
import BooksHeader from './components/BooksHeader';
import BookListContextProvider from './contexts/BookListContext';
import { Auth } from './components/auth';

export default function App() {
  return (
    <div className="app">
      <Auth />
      <BookListContextProvider>
        <Header></Header>
        <BooksHeader />
        <Books />
      </BookListContextProvider>
    </div>
  );
}
