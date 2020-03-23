import React, { useEffect, useState } from 'react';

import Header from './Header';

import axios from 'axios';

export default function Application(props) {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const auth = await axios.get('/users/auth/current_user');
      if(auth.data) {
        console.log(auth.data);
        setAuth(auth.data);
      } else {
        console.log(auth);
      }
    }
    fetchUser();

  }, []);

  return (
    <>
      <Header auth={auth}/>
    </>
  );
};