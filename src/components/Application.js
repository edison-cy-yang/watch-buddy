import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header';
import Feed from './Feed';
import FriendRequests from './FriendRequests';

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
    <div>
      <BrowserRouter>
        <Header auth={auth}/>
        <Route exact path="/feed" component={Feed} />
        <Route exact path="/FriendRequests" component={FriendRequests} />
      </BrowserRouter>
    </div>
  );
};