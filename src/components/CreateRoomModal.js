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
import { CopyToClipboard } from 'react-copy-to-clipboard';

import axios from 'axios';

import './CreateRoomModal.scss';

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
    width: '400px',
    height: '300px'
  },
  formInput: {
    margin: '10px',
    width: 350
  }
}));

export default function CreateRoomModal(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [newRoomUrl, setNewRoomUrl] = useState("");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);

  const auth = useContext(UserContext);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewRoomUrl("");
    setTitle("");
    setUrl("");
  };

  const createRoom = async (event) => {
    event.preventDefault();
    if (title === "" || url === "") {
      setError(true);
      return;
    }
    setSaving(true);
    const room = {
      title,
      video_url: url
    }
    const owner_id = auth.id;
    try {
      const newRoom = await axios.post(`${process.env.REACT_APP_API_URL}/rooms`, {room, owner_id});
      setSaving(false);
      setNewRoomUrl(`${process.env.REACT_APP_CLIENT_URL}/${newRoom.data.uid}`);
    } catch(err) {
      console.log(err);
    }
    
  }

  const onTitleChange = (event) => {
    setTitle(event.target.value)
    setError(false);
  }

  return (
    <div>
      <div className="add-icon">
        <IconButton className={classes.button} color="primary" aria-label="Create New Room" onClick={handleOpen}>
          <AddCircleIcon fontSize='large' />
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
              <TextField className={classes.formInput} id="outlined-basic" label="title" variant="outlined" onChange={onTitleChange} error={error} />
              <TextField className={classes.formInput} id="outlined-basic" label="YouTube video URL" variant="outlined" onChange={event => setUrl(event.target.value)} error={error} />
              {!saving && !newRoomUrl && <Button type="submit" variant="contained" color="primary">Create</Button>}
              {!saving && newRoomUrl && (
                <>
                  <p>URL to your new room:</p>
                  <p>{newRoomUrl}</p>
                  <CopyToClipboard text={newRoomUrl}>
                    <Button variant="outlined">Copy to clipboard</Button>
                  </CopyToClipboard>
                </>
              )}
              {saving && (<CircularProgress />)}
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};