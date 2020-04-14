import React, { useEffect, useState } from 'react';

export default function Members(props) {
  const [members, setMember] = useState([]);
  const [numOfMembers, setNumberOfMembers] = useState(0);

  useEffect(() => {
    console.log(props.socket);
    props.socket.on('new member', (res) => {
      console.log("person joined");
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
      <h3>People online: {numOfMembers}</h3>
    </div>
  );
};