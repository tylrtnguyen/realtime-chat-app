// Basic boilerplate for every component
import React, { useState, useContext, useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { useStyles } from "./UseStyles";
import Typography from "@material-ui/core/Typography";
import { GlobalContext } from "../../context/GlobalState"
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';


export const RoomList = () => {
  const classes = useStyles();
  const {changeActiveRoom, rooms, getRooms } = useContext(GlobalContext)
  
  // Get rooms from the global state
  useEffect(() => {
    getRooms()
  }, [])

  const handleListItemClick = room => {
    changeActiveRoom(room);
  };
  

  return (
     <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <List className={classes.root}>
      <ListItem>
        <Typography variant="h5">Chat Rooms</Typography>
      </ListItem>
      <ListItem>
        <Divider></Divider>
      </ListItem>
      {rooms.map(room => (
        <ListItem
          className={classes.listRoot}
          alignItems="flex-start"
          key={room.name}
          button
          onClick={e => handleListItemClick(e.target.innerText)}
        >
          <ListItemText
            variant="body2"
            primary
            color={classes.color}
            className={classes.inline}
            primary={room.name}
          />
        </ListItem>
        ))}
    </List>
    </Drawer>
   
  );
};
