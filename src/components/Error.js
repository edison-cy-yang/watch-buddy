import React from 'react';

import './Error.scss';

export default function Error(props) {

  return (
    <div className="error-container">
      <h2>Opps, an error happened:</h2>
      <h3>{props.error}</h3>
    </div>
  );
};