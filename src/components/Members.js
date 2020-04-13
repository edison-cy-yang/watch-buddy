import React, { useEffect } from 'react';

export default function Members(props) {


  useEffect(() => {
    console.log(props.socket);
  }, [])

  return (
    <h3>People online: </h3>
  );
};