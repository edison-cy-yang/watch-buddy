import React, { useEffect, useState, useContext, useReducer } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import UserContext from '../contexts/UserContext';

import Header from './Header';
import Feed from './Feed';
import FriendRequests from './FriendRequests';
import MyRooms from './MyRooms';
import ChatRoom from './ChatRoom';
import CreateRoom from './CreateRoom';
import Home from './Home';
import Room from './Room';

import axios from 'axios';

const fetchUser = async () => {
  const auth = await axios.get(`${process.env.REACT_APP_API_URL}/users/auth/current_user`, {withCredentials: true});
  if(auth.data) {
    console.log(auth.data);
    return auth.data;
  } else {
    return null;
  }
}

const reducer = async (state, action) => {
  switch (action.type) {
    case "GET_USER":
      const user = await fetchUser();
      // const user = { id: 1, name: "edison", email: "123@abc.com"};
      if (user) {
        console.log(user);
        return {
          user
        }
      } else {
        return {
          user: null
        }
      }     
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}


export default function Application(props) {

  const [state, dispatch] = useReducer(reducer, {user: null});
  // dispatch({type: "GET_USER"});
  const value = state.user;

  const [auth, setAuth] = useState({
    id: null,
    name: null,
    email: null,
    google_id: null,
    loading: true
  });

  useEffect(() => {
    dispatch({type: "GET_USER"});

    const fetchUser = async () => {
      const auth = await axios.get(`${process.env.REACT_APP_API_URL}/users/auth/current_user`, {withCredentials: true});
      if(auth.data) {
        console.log(auth.data);
        setAuth({...auth.data, loading: false});
      } else {
        setAuth({...auth.data, loading: false});
      }
    }
    fetchUser();
    
  }, []);


  return (
    <UserContext.Provider value={auth}>
      <div>
        <BrowserRouter>
          <Header auth={auth}/>
          <Route exact path="/:roomId" component={Room} />
          <Route exact path="/" component={Home} />     
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  );
};