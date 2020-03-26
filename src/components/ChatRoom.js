import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Youtube from 'react-youtube';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import io from 'socket.io-client';

export default function ChatRoom(props) {
  // const playerRef = useRef(null);
  // console.log("playerRef");
  // console.log(playerRef);

  const socket = io("http://localhost:8080/");

  const room = props.location.state;
  
  const [player, setPlayer] = useState(null);

  const getVideoId = (url) => {
    //Get videoId
    const rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
    const videoId = url.match(rx)[1];
    return videoId;
  };

  const videoId = getVideoId(room.video_url);

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
      <h1>I am inside a room for <b>{room.title}</b></h1>
      <Youtube
        // ref={playerRef}
        videoId={videoId}
        opts={opts}
        onReady={onReady}
        onPlay={onPlay}
        onPause={onPause}
        onStateChange={onStateChange}
      />
      {/* <IconButton aria-label="play" onClick={playVideo}>
        <PlayCircleOutlineIcon />
      </IconButton> */}
    </div>
  );
};