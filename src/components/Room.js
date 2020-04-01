import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  useParams
} from "react-router-dom";

import axios from 'axios';

import Button from '@material-ui/core/Button';


import io from 'socket.io-client';

import YouTubePlayer from 'react-player/lib/players/YouTube';

import { getVideoId } from '../helpers/videoHelpers';

// const socket = io(process.env.REACT_APP_API_URL);
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
  const [videoId, setVideoId] = useState(null);

  const [played, setPlayed] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [player1, setPlayer1] = useState(null);
  const [seeking, setSeeking] = useState(false);

  useEffect(() => {
    const getRoomByUid = async (uid) => {
      const room = await axios.get(`${process.env.REACT_APP_API_URL}/rooms/uid/${uid}`);
      if (room.data) {
        setRoom(room.data);
        setVideoId(getVideoId(room.data.video_url));
        setLoading(false);
      } else {
        console.log("room does not exist");
      }
    }
    getRoomByUid(roomId);
  }, [roomId])

  useEffect(() => {
    if (player1 && room.id) {
      socket = io(process.env.REACT_APP_API_URL);
      console.log(player1);
      console.log(socket);
      socket.on('connect', () => {
        console.log("connected as player1!");
        socket.emit("room", { roomId: room.id });
      })

      socket.on('plays', () => {
        console.log("received play in player1");
        
        setPlaying(true);
      });

      socket.on('pauses', () => {
        console.log("received pause in player1");
        setPlaying(false);
      });

      socket.on('seek', (time) => {
        console.log('seek');
        console.log(time);
        setPlayed(parseFloat(time));
        player1.seekTo(time);
      })
      socket.on('disconnect', () => {
        console.log("disconnected");
      })
    }
  },[player1, room.id])

  const handleSeekMouseDown = (e) => {
    setSeeking(true);
  }


  const handleSeekMouseUp = (e) => {
    console.log(e.target.value);
    setSeeking(false);
    player1.seekTo(parseFloat(e.target.value));
  }

  const handleProgress = (state) => {
    console.log('on progress', state.played);
    if (!seeking)
      setPlayed(state.played);
  }

  const ref = (player) => {
    setPlayer1(player);
  }

  const handlePlayPause = () => {
    if (playing) {
      socket.emit("pauses");
    } else {
      socket.emit("plays");
    }
    setPlaying(!playing);
  }

  const handleSeekChange = (event) => {
    socket.emit("seek", event.target.value);
    setPlayed(parseFloat(event.target.value));
  }

  return (
    <div>
      
      <h2>{roomId}</h2> 
      {!loading && (
        <>
          <h2>{room.title}</h2>
          
          <YouTubePlayer 
            ref={ref}
            url={room.video_url} 
            onProgress={handleProgress} 
            playing={playing}
          />
          <Button onClick={handlePlayPause}>{playing? 'Pause' : 'Play'}</Button>
          <input
            type='range' min={0} max={0.999999} step='any'
            value={played}
            onMouseDown={handleSeekMouseDown}
            onChange={handleSeekChange}
            onMouseUp={handleSeekMouseUp}
          />
        </> 
      )}
    </div>
  );
}

export default Room;