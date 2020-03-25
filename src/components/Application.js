import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import Header from './Header';
import Feed from './Feed';
import FriendRequests from './FriendRequests';
import MyRooms from './MyRooms';

import UserContext from '../contexts/UserContext';

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
    <UserContext.Provider value={auth}>
      <div>
        <BrowserRouter>
          <Header auth={auth}/>
          <Link to="/feed">Feed</Link>
          <Link to="/MyRooms">My Rooms</Link>
          <Route exact path="/feed" component={Feed} />
          <Route exact path="/FriendRequests" component={FriendRequests} />
          <Route exact path="/MyRooms" component={MyRooms} />
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  );
};