import React, { useEffect, useState, useRef, useContext } from 'react';
import UserContext from '../contexts/UserContext';

import 'react-chat-elements/dist/main.css';
import { MessageBox, MessageList } from 'react-chat-elements';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';

export default function Chat(props) {
  const [messages, setMessages] = useState([
    {
      position: 'left',
      type: 'text',
      text: 'System: Welcome to the chat',
      date: new Date(),
    }
  ]);

  const auth = useContext(UserContext);

  const [message, setMessage] = useState("");

  useEffect(() => {
    props.socket.on('message', (message) => {
      setMessages((prev) => ([...prev, {
        position: 'left',
        type: 'text',
        text: `${message.user.name}: ${message.message}`,
        date: new Date()
      }]))
    })
  }, [])

  const handleMessage = (event) => {
    setMessage(event.target.value);
  }

  const onSend = () => {
    if (message === "") return;
    setMessages([...messages, {
      position: 'right',
      type: 'text',
      text: `${auth.name}: ${message}`,
      date: new Date()
    }]);
    setMessage("");
    props.socket.emit('message', {user: {id: auth.id, name: auth.name}, message});
  };

  const onKeyPress = (e) => {
    if (e.charCode !== 13)
      return;
    e.preventDefault();
    onSend();
  }

  return (
    <div style={{margin: '10px'}}>
      <h2>Chat</h2>
      <div style={{width: '400px', height: '495px', overflowY: 'auto', position: 'relative', bottom: 0, display: 'flex', flexDirection: 'column-reverse', backgroundColor: 'white', margin: '5px', borderRadius: 10, padding: '5px'}}>
        <MessageList
          className='message-list'
          lockable={true}
          toBottomHeight={'100%'}
          dataSource={messages}
        />
      </div>
      <div style={{backgroundColor: 'white', margin: '5px', borderRadius: 10, padding: '5px'}}>
        <TextField
          style={{width: '350px'}}
          multiline
          placeholder="Type here..."
          value={message}
          onChange={handleMessage}
          onKeyPress={onKeyPress}
        />
        <IconButton color="primary" onClick={onSend} disabled={message === ""}>
          <SendIcon />
        </IconButton>
      </div>
    </div>
  )
}