import React, { useEffect, useContext } from 'react';

import UserContext from '../contexts/UserContext';

import axios from 'axios';

export default function Feed(props) {
  //get current user's id
  const auth = useContext(UserContext);
  console.log(auth);

  useEffect(() => {
    if(auth.id) {
      const fetchRooms = async () => {
        const rooms = await axios.get(`/rooms?id=${auth.id}`);
        console.log(rooms.data);
      }
      fetchRooms();
    }
  }, [auth])

  return (
    <h1>I am feed</h1>
  );
};