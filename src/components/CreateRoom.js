import React, { useContext, useEffect, useState } from 'react';

import UserContext from '../contexts/UserContext';
import CreateRoomModal from './CreateRoomModal';

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

import './CreateRoom.scss';

export default function CreateRoom(props) {

  return (
    <div>
      <h3 className="slogan">Start watching YouTube and chat with you friends, together</h3>
      <CreateRoomModal />
    </div>
  );
};