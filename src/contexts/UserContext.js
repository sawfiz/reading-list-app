import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export default function UserContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState('')

  // const updateLoggedIn = (value) => {
  //   setLoggedIn(value)
  // }

  return (
    <UserContext.Provider value={({loggedIn, setLoggedIn, userId, setUserId})}>
      {props.children}
    </UserContext.Provider>
  )
}
