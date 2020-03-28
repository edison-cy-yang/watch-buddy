import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";

import axios from 'axios';

import Youtube from 'react-youtube';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import io from 'socket.io-client';

import { getVideoId } from '../helpers/videoHelpers';

export default function Room() {
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
  const [player, setPlayer] = useState(null);
  console.log(videoId);

  useEffect(() => {
    const getRoomByUid = async (uid) => {
      const room = await axios.get(`/rooms/uid/${uid}`);
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

  const socket = io("http://localhost:8080/");

  useEffect(() => {
    if (player) {
    
      socket.on('connect', () => {
        console.log("connected!");
        socket.emit("room", { roomId: room.id });
      })

      socket.on('play', () => {
        if (player) {
          player.playVideo();
        }
      });

      socket.on('pause', () => {
        player.pauseVideo();
      });

      socket.on('seek', (time) => {
        player.seekTo(time);
        player.playVideo();
      })
    }
  },[player])

  const opts = {
    height: '390',
    width: '640',
    playerVars: { // https://developers.google.com/youtube/player_parameters
      autoplay: 1
    }
  };

  const onReady = (event) => {
    event.target.stopVideo();
    console.log("set player");
    setPlayer(event.target);
  }

  const onPlay = (event) => {
    console.log("play!");
    socket.emit("play");
  }

  const onPause = (event) => {
    console.log(event)
    console.log("pause!");
    socket.emit("pause");
  }

  const onStateChange = (event) => {
    if (event.data === 3) {
      console.log(event.target.playerInfo.currentTime);
      socket.emit("seek", event.target.playerInfo.currentTime);
    }
  }

  return (
    <div>
      
      <h2>{roomId}</h2> 
      {!loading && (
        <>
          <h2>{room.title}</h2>
          <Youtube
            videoId={videoId}
            opts={opts}
            onReady={onReady}
            onPlay={onPlay}
            onPause={onPause}
            onStateChange={onStateChange}
          />
        </> 
      )}
    </div>
  );
}