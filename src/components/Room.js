import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  useParams
} from "react-router-dom";

import axios from 'axios';

import VideoPlayer from './VideoPlayer';
import Chat from './Chat';
import Error from './Error';

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

  const [error, setError] = useState("");

  useEffect(() => {
    const getRoomByUid = async (uid) => {
      const room = await axios.get(`${process.env.REACT_APP_API_URL}/rooms/uid/${uid}`);
      if (room.data) {
        setRoom(room.data);
        setLoading(false);
      } else {
        setError("Room not found, are you sure you entered the right URL?");
        setLoading(false);
      }
    }
    getRoomByUid(roomId);
  }, [roomId])

  useEffect(() => {
    if (room.id) {
      socket = io(process.env.REACT_APP_API_URL);
      socket.on('connect', () => {
        socket.emit("room", { roomId: room.id });
      });
    }
  }, [room.id])


  return (
    <div>
      {!loading && !error && (
        <div style={{display: 'flex', padding: '20px', justifyContent: 'center'}}>
          <VideoPlayer
            room={room}
            loading={loading}
            socket={socket}
          />
          <Chat
            socket={socket}
          />
        </div>
      )}
      {!loading && error && (
        <Error error={error} />
      )}
    </div>
  );
}

export default Room;