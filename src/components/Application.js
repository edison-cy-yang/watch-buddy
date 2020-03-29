import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import UserContext from '../contexts/UserContext';

import Header from './Header';
import Feed from './Feed';
import FriendRequests from './FriendRequests';
import MyRooms from './MyRooms';
import ChatRoom from './ChatRoom';
import Room from './Room';
import CreateRoom from './CreateRoom';
import Home from './Home';

import axios from 'axios';


export default function Application(props) {

  const [auth, setAuth] = useState({
    id: null,
    name: null,
    email: null,
    google_id: null
  });

  useEffect(() => {
    const fetchUser = async () => {
      const auth = await axios.get(`${process.env.REACT_APP_API_URL}/users/auth/current_user`, {withCredentials: true});
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
          
          {/* {auth.id && (
            <CreateRoom />
          )} */}
          {/* <Link to="/feed">Feed</Link>
          <Link to="/MyRooms">My Rooms</Link>
          <Link to="/rooms">Rooms</Link> */}
          <Route exact path="/:roomId" component={Room} />
          {/* <Route exact path="/feed" component={Feed} />
          <Route exact path="/chatroom" component={ChatRoom} />
          <Route exact path="/FriendRequests" component={FriendRequests} />
          <Route exact path="/MyRooms" component={MyRooms} /> */}    
          <Route exact path="/" component={Home} />     
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  );
};