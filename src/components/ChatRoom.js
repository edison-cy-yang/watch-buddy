import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Youtube from 'react-youtube';

export default function ChatRoom(props) {

  const room = props.location.state;
  console.log(room);

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

  return (
    <div>
      <h1>I am inside a room for <b>{room.title}</b></h1>
      <Youtube
        videoId={videoId}
        opts={opts}
      />
    </div>
  );
};