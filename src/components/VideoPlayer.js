import React, {useEffect, useState} from 'react';

import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

import YouTubePlayer from 'react-player/lib/players/YouTube';

import './VideoPlayer.scss';

import {format, pad} from '../helpers/videoHelpers';

// let socket;

function VideoPlayer(props) {

  const [played, setPlayed] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [player, setPlayer] = useState(null);
  const [seeking, setSeeking] = useState(false);
  const [duration, setDuration] = useState(0);

  const { innerWidth, innerHeight } = window;
  const [dimension, setDimension] = useState({width: 854, height: 480});

  useEffect(() => {
    if (innerWidth < 1300) {
      setDimension({
        width: 640, 
        height: 360
      });
    }
  }, [innerWidth])

  console.log(dimension);

  useEffect(() => {
    if (player && props.room.id) {
      props.socket.on('plays', () => {     
        setPlaying(true);
      });

      props.socket.on('pauses', () => {
        setPlaying(false);
      });

      props.socket.on('seek', (time) => {
        setPlayed(parseFloat(time));
        player.seekTo(time);
      })
      props.socket.on('disconnect', () => {
      })
    }
    
  },[player, props.room.id])

  const handleSeekMouseDown = (e) => {
    setSeeking(true);
  }


  const handleSeekMouseUp = (e) => {
    setSeeking(false);
    player.seekTo(parseFloat(e.target.value));
  }

  const handleProgress = (state) => {
    if (!seeking)
      setPlayed(state.played);
  }

  const ref = (player) => {
    if (player) {
      setPlayer(player);
    }
  }

  const handlePlayPause = () => {
    if (playing) {
      props.socket.emit("pauses");
    } else {
      props.socket.emit("plays");
    }
    setPlaying(!playing);
  }

  const handleSeekChange = (event) => {
    props.socket.emit("seek", event.target.value);
    setPlayed(parseFloat(event.target.value));
  }

  const handleDuration = (duration) => {
    setDuration(duration);
  }

  return (
    <div className="player-content">
      {!props.loading && (
        <>
          <h2>{props.room.title}</h2>
          <div className="player">
            <YouTubePlayer 
              ref={ref}
              url={props.room.video_url} 
              onProgress={handleProgress} 
              playing={playing}
              onDuration={handleDuration}
              width={dimension.width}
              height={dimension.height}
            />
            <input
              type='range' min={0} max={0.999999} step='any'
              value={played}
              onMouseDown={handleSeekMouseDown}
              onChange={handleSeekChange}
              onMouseUp={handleSeekMouseUp}
            />
            <IconButton onClick={handlePlayPause}>
              {playing && (<PauseIcon fontSize='large' />) }
              {!playing && (<PlayArrowIcon fontSize='large' />) }
            </IconButton>
            <span>{format(played * duration)} / {format(duration)}</span>
          </div>
        </> 
      )}
    </div>
  )
}

export default VideoPlayer;