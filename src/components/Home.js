import React, { useContext } from 'react';

import UserContext from '../contexts/UserContext';

import CreateRoom from './CreateRoom';

import Button from '@material-ui/core/Button';

export default function Home(props) {
  const auth = useContext(UserContext);

  return (
    <div>
      {!auth.loading && auth.id && (
        <CreateRoom />
      )}
      {!auth.loading && !auth.id && (
        <div>
          <Button href={`${process.env.REACT_APP_API_URL}/users/auth/google`}>
            Sign in with Google
          </Button>
        </div>
      )}
    </div>
  );
};