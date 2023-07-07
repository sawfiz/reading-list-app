import React from 'react';
import AddBook from './AddBook';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';


export default function Header() {
  const {setLoggedIn} = useContext(UserContext)
  const user = auth.currentUser
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setLoggedIn(false);
    } catch (err) {
      console.log('Error');
    }
  };
  return (
    <header>
      <AddBook />
      <h1>My Reading List</h1>
      <div className='google'>
          <img className="avatar" src={user.photoURL} alt="Avatar" />
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
    </header>
  );
}
