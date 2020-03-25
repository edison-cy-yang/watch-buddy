import React, { useEffect, useContext, useState } from 'react';

import UserContext from '../contexts/UserContext';

import axios from 'axios';

export default function Feed(props) {
  //get current user's id
  const auth = useContext(UserContext);
  const [rooms, setRooms] = useState({});

  const transformRawRoomsData = (rooms) => {
    const transformed = {};
    rooms.forEach(room => {
      console.log(room.owner_id);
      if(!transformed[room.owner_id]) {
        transformed[room.owner_id] = [room];
      } else {
        transformed[room.owner_id] = [...transformed[room.owner_id], room];
      }
    })
    return transformed;
  }

  useEffect(() => {
    if(auth.id) {
      const fetchRooms = async () => {
        const rooms = await axios.get(`/rooms?id=${auth.id}`);
        console.log(rooms.data);
        const transformedRooms = transformRawRoomsData(rooms.data);
        setRooms(transformedRooms);
      }
      fetchRooms();
    }
  }, [auth])

  console.log(rooms);

  return (
    <h1>I am feed</h1>
  );
};