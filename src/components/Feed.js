import React, { useEffect, useContext, useState } from 'react';
import { Link, BrowserRouter, Route, Switch } from 'react-router-dom';

import UserContext from '../contexts/UserContext';

import axios from 'axios';

export default function Feed(props) {
  //get current user's id
  const auth = useContext(UserContext);
  const [rooms, setRooms] = useState([]);

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
        // const transformedRooms = transformRawRoomsData(rooms.data);
        // console.log(Object.values(transformedRooms));
        setRooms(rooms.data);
      }
      fetchRooms();
    }
  }, [auth])

  console.log(rooms);

  return (
    <div>
      <h1>I am feed</h1>
      {rooms.map(room => {
        return (
          <p key={room.id}>
            <b>
              <Link to={{
                pathname:'/chatroom',
                state: room
              }}>
                {room.title}
              </Link>
            </b> by {room.name}
          </p>)
      })}
    </div>
  );
};