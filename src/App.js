import React, {useEffect} from 'react';
import Books from './components/Books';
import './App.css';
import Header from './components/Header';
import BooksHeader from './components/BooksHeader';
import BookListContextProvider from './contexts/BookListContext';
import { onAuthStateChanged } from 'firebase/auth';
import { Auth } from './components/auth';
import { auth } from './config/firebase';
import { useContext } from 'react';
import { UserContext } from './contexts/UserContext';

export default function App() {
  const {loggedIn, setLoggedIn, setUserId } = useContext(UserContext)

  // Keep user logged in after a page refresh
  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in
        setLoggedIn(true);
        setUserId(user.uid);
      } else { 
        // User is logged out
        setLoggedIn(false);
        setUserId('');
      }
    });
    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, []);

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
