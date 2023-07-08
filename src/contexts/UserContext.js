import React, { createContext, useState } from 'react';
import { db } from '../config/firebase';
import { auth } from '../config/firebase';

import { collection, doc, getDoc, setDoc } from 'firebase/firestore';

export const UserContext = createContext();

export default function UserContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState('');

  const userCollection = collection(db, 'users');

  const checkUser = async (id) => {
    const user = await getDoc(doc(userCollection, id));
    if (user.exists()) {
      return true;
    } else {
      console.log('No such document');
      // use setDoc to specific an document ID
      // use addDoc to let Firestore choose ID for you
      const name = auth.currentUser.displayName;
      const email = auth.currentUser.email;
      await setDoc(doc(userCollection, id), { name, email });
      return false;
    }
  };


  return (
    <UserContext.Provider value={{ loggedIn, setLoggedIn, userId, setUserId, checkUser }}>
      {props.children}
    </UserContext.Provider>
  );
}
