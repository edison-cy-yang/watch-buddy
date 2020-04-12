import React from 'react';

export default function Error(props) {
  console.log("error");
  return (
    <div>
      <h2>Opps, an error happened:</h2>
      <h3>{props.error}</h3>
    </div>
  );
};