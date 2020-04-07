import React, { useEffect, useState, useRef, useContext } from 'react';
import UserContext from '../contexts/UserContext';

// import { Widget, addResponseMessage } from 'react-chat-widget';
// import 'react-chat-widget/lib/styles.css';

import 'react-chat-elements/dist/main.css';
import { MessageBox, MessageList } from 'react-chat-elements';

// import { Launcher } from 'react-chat-window';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
      // addResponseMessage("play");
      console.log("got message");
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
    console.log(message);
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
    onSend();
  }

  return (
    <div>
      <h1>Chat</h1>
      <div style={{width: '400px', height: '350px', overflowY: 'scroll', position: 'relative', bottom: 0, display: 'flex', flexDirection: 'column-reverse'}}>
        <MessageList
          className='message-list'
          lockable={true}
          toBottomHeight={'100%'}
          dataSource={messages}
        />
      </div>
      <TextField
        style={{width: '350px'}}
        multiline
        placeholder="Type here..."
        value={message}
        onChange={handleMessage}
        onKeyPress={onKeyPress}
      />
      <Button
        onClick={onSend}
      >
        Send
      </Button>
    </div>
  )
}