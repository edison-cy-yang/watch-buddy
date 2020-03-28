import React, { useContext, useEffect, useState } from 'react';

import UserContext from '../contexts/UserContext';

import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import axios from 'axios';

import './CreateRoom.scss';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    width: '30px',
    height: '30px'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  createForm: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '200px'
  },
}));

export default function CreateRoom(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [newRoomId, setNewRoomId] = useState("");

  const [saving, setSaving] = useState(false);

  const auth = useContext(UserContext);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewRoomId("");
    setTitle("");
    setUrl("");
  };

  const createRoom = async (event) => {
    event.preventDefault();
    setSaving(true);
    const room = {
      title,
      video_url: url
    }
    const owner_id = auth.id;
    try {
      const newRoom = await axios.post('/rooms', {room, owner_id});
      console.log(newRoom);
      setSaving(false);
      setNewRoomId(newRoom.data.uid);
    } catch(err) {
      console.log(err);
    }
    
  }

  return (
    <div>
      <h1>I am Create Room</h1>
      <div className="add-icon">
        <IconButton className={classes.button} color="primary" aria-label="Create New Room" onClick={handleOpen}>
          <AddCircleIcon />
        </IconButton>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <form className={classes.createForm} onSubmit={createRoom}>
              <TextField id="outlined-basic" label="title" variant="outlined" onChange={event => setTitle(event.target.value)} />
              <TextField id="outlined-basic" label="YouTube video URL" variant="outlined" onChange={event => setUrl(event.target.value)} />
              {!saving && !newRoomId && <Button type="submit" variant="contained" color="primary">Create</Button>}
              {!saving && newRoomId && (<span>Room id is: {newRoomId}</span>)}
              {saving && (<CircularProgress />)}
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};