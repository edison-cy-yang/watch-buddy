import React, {useEffect, useState} from 'react';

import Button from '@material-ui/core/Button';


import io from 'socket.io-client';

import YouTubePlayer from 'react-player/lib/players/YouTube';


let socket;

function VideoPlayer(props) {

  const [played, setPlayed] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [player, setPlayer] = useState(null);
  const [seeking, setSeeking] = useState(false);

  useEffect(() => {
    if (player && props.room.id) {
      socket = io(process.env.REACT_APP_API_URL);
      console.log(player);
      console.log(socket);
      socket.on('connect', () => {
        console.log("connected as player!");
        socket.emit("room", { roomId: props.room.id });
      })

      socket.on('plays', () => {
        console.log("received play in player");
        
        setPlaying(true);
      });

      socket.on('pauses', () => {
        console.log("received pause in player");
        setPlaying(false);
      });

      socket.on('seek', (time) => {
        console.log('seek');
        console.log(time);
        setPlayed(parseFloat(time));
        player.seekTo(time);
      })
      socket.on('disconnect', () => {
        console.log("disconnected");
      })
    }
  },[player, props.room.id])

  const handleSeekMouseDown = (e) => {
    setSeeking(true);
  }


  const handleSeekMouseUp = (e) => {
    console.log(e.target.value);
    setSeeking(false);
    player.seekTo(parseFloat(e.target.value));
  }

  const handleProgress = (state) => {
    console.log('on progress', state.played);
    if (!seeking)
      setPlayed(state.played);
  }

  const ref = (player) => {
    setPlayer(player);
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
      {!props.loading && (
        <>
          <h2>{props.room.title}</h2>
          
          <YouTubePlayer 
            ref={ref}
            url={props.room.video_url} 
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
  )
}

export default VideoPlayer;