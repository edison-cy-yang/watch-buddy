import React from 'react';

import CreateRoomModal from './CreateRoomModal';

import './CreateRoom.scss';

export default function CreateRoom(props) {

  return (
    <div className="create-room-container">
      <div className="slogan">
        <h2>Watch YouTube and chat with your friends together</h2>
        <h2>Start by creating a room</h2>
      </div>
      <CreateRoomModal />
    </div>
  );
};