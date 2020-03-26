import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Youtube from 'react-youtube';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import IconButton from '@material-ui/core/IconButton';

export default function ChatRoom(props) {

  const room = props.location.state;
  console.log(room);
  const [player, setPlayer] = useState(null);

  const getVideoId = (url) => {
    //Get videoId
    const rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
    const videoId = url.match(rx)[1];
    return videoId;
  };

  const videoId = getVideoId(room.video_url);

  const opts = {
    height: '390',
    width: '640',
    playerVars: { // https://developers.google.com/youtube/player_parameters
      autoplay: 1
    }
  };

  const onReady = (event) => {
    event.target.stopVideo();
    setPlayer(event.target);
  }

  const onPlay = () => {
    console.log("play!");
  }

  const onPause = () => {
    console.log("pause!");
  }

  const onStateChange = (event) => {
    console.log(event.target.playerInfo.currentTime);
  }

  return (
    <div>
      <h1>I am inside a room for <b>{room.title}</b></h1>
      <Youtube
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