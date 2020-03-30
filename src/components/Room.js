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
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';

import io from 'socket.io-client';

import YouTubePlayer from 'react-player/lib/players/YouTube';

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

  const [played, setPlayed] = useState(0);
  const [playing, setPlaying] = useState(false);

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

  const socket = io(process.env.REACT_APP_API_URL);

  useEffect(() => {
    if (player) {
    
      socket.on('connect', () => {
        console.log("connected!");
        socket.emit("room", { roomId: room.id });
      })

      socket.on('play', () => {
        if (player) {
          console.log("received play");
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
      autoplay: 1,
      controls: 0
    }
  };

  const onReady = (event) => {
    event.target.stopVideo();
    console.log("set player");
    setPlayer(event.target);
  }

  const onPlay = (event) => {
    // console.log("play!");
    // socket.emit("play");
  }

  const onPause = (event) => {
    // console.log(event)
    // console.log("pause!");
    // socket.emit("pause");
  }

  const onStateChange = (event) => {
    if (event.data === 3) {
      console.log(event.target.playerInfo.currentTime);
      socket.emit("seek", event.target.playerInfo.currentTime);
    }
  }

  const play = (event) => {
    player.playVideo();
    socket.emit('play');
  }

  const pause = (event) => {
    player.pauseVideo()
    socket.emit('pause');
  }

  const handleSeekMouseDown = (e) => {

  }

  const handleSeekMouseUp = (e) => {
    console.log(e.target.value);
    player.seekTo(parseFloat(e.target.value));
  }

  const handleProgress = (state) => {
    setPlayed(state.played);
  }

  const ref = (player) => {
    console.log(player);
  }

  const handlePlayPause = () => {
    setPlaying(!playing);
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
          <Button onClick={play}>Play</Button>
          <Button onClick={pause}>Pause</Button>
          {/* <LinearProgress variant="buffer" value={1} valueBuffer={10} /> */}
          <input
            type='range' min={0} max={0.999999} step='any'
            value={played}
            onMouseDown={handleSeekMouseDown}
            // onChange={this.handleSeekChange}
            onMouseUp={handleSeekMouseUp}
          />
          <YouTubePlayer 
            ref={ref}
            url={room.video_url} 
            onProgress={handleProgress} 
            playing={playing}
          />
          <Button onClick={handlePlayPause}>{playing? 'Pause' : 'Play'}</Button>
        </> 
      )}
    </div>
  );
}