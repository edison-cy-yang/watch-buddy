import React, { useContext, useEffect } from 'react';

import UserContext from '../contexts/UserContext';

import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';

import './MyRooms.scss';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function MyRooms(props) {
  const classes = useStyles();

  const auth = useContext(UserContext);
  console.log(auth);

  useEffect(() => {

  },[auth]);

  return (
    <div>
      <h1>I am My Rooms</h1>
      <div className="add-icon">
        <IconButton className={classes.button} color="primary" aria-label="Create New Room">
          <AddCircleIcon />
        </IconButton>
      </div>
    </div>
  );
};