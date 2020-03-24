import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';

import './Header.scss';

import UserContext from '../contexts/UserContext';

export default function MenuAppBar(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const auth = useContext(UserContext);
  console.log("auth is ");
  console.log(auth);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
      <AppBar position="static" className="header">
        <Toolbar>
          <Typography variant="h4" className="title">
            Watch Buddy
          </Typography>
          {auth && (
            <div className="auth-info">
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Friend Requests</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem>
                  <a href={`${process.env.REACT_APP_API_URL}/users/auth/logout`} style={{textDecoration: 'none'}}>Logout</a>
                </MenuItem>
              </Menu>
              <Typography variant="h6">
                {auth.name}
              </Typography>
            </div>
          )}
          {!auth && (
            <div>
              <Button variant="contained">
                <a href={`${process.env.REACT_APP_API_URL}/users/auth/google`}>Sign in with Google</a>
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
  );
}