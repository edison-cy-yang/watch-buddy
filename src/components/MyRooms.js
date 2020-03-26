import React, { useContext, useEffect } from 'react';

import UserContext from '../contexts/UserContext';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';

import './MyRooms.scss';

export default function MyRooms(props) {
  const auth = useContext(UserContext);
  console.log(auth);
  return (
    <div>
      <h1>I am My Rooms</h1>
      <div className="add-icon">
        <IconButton color="primary" aria-label="Create New Room">
          <AddCircleIcon />
        </IconButton>
      </div>
    </div>
  );
};