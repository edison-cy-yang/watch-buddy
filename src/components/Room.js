import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  useParams
} from "react-router-dom";

import axios from 'axios';

import VideoPlayer from './VideoPlayer';
import Chat from './Chat';

import io from 'socket.io-client';

let socket;

function Room() {
  let { roomId } = useParams();
  const [room, setRoom] = useState({
    id: null,
    uid: null,
    title: null,
    video_url: null,
    owner_id: null
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRoomByUid = async (uid) => {
      const room = await axios.get(`${process.env.REACT_APP_API_URL}/rooms/uid/${uid}`);
      if (room.data) {
        setRoom(room.data);
        setLoading(false);
      } else {
        console.log("room does not exist");
      }
    }
    getRoomByUid(roomId);
  }, [roomId])

  useEffect(() => {
    if (room.id) {
      socket = io(process.env.REACT_APP_API_URL);
      socket.on('connect', () => {
        console.log("connected as player!");
        socket.emit("room", { roomId: room.id });
      });
    }
  }, [room.id])


  return (
    <div>
      {!loading && (
        <>
        <VideoPlayer
          room={room}
          loading={loading}
          socket={socket}
        />
        <Chat
          socket={socket}
        />
        </>
      )}
    </div>
  );
}

export default Room;