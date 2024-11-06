import React from 'react';
import { AppBar, Avatar, Badge, IconButton, Toolbar, Typography } from "@mui/material";
import Notifications from "@mui/icons-material/Notifications";
import Person from "@mui/icons-material/Person";

const Header = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" flexGrow={1}>
          Hi, Mr. Peabody!
        </Typography>
        <IconButton color="inherit">
          <Badge badgeContent={1} color="error">
            <Notifications />
          </Badge>
        </IconButton>
        <Avatar>
          <Person />
        </Avatar>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
