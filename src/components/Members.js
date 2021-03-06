import React, { useEffect, useState } from 'react';

export default function Members(props) {
  const [members, setMember] = useState([]);
  const [numOfMembers, setNumberOfMembers] = useState(0);

  useEffect(() => {
    props.socket.on('new member', (res) => {
      setNumberOfMembers(res.numOfPeople);
    });

    props.socket.on('someone left', (res) => {
      setNumberOfMembers(res.numOfPeople);
    });

    return () => {
      props.socket.emit("leave");
    }
  }, [])

  return (
    <div>
      <h2>Online: {numOfMembers}</h2>
    </div>
  );
};