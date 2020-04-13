// Basic boilerplate for every component
import React, { useState, useContext, useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { useStyles } from "./UseStyles";
import Typography from "@material-ui/core/Typography";
import { GlobalContext } from "../../context/GlobalState"
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'


export const RoomList = () => {
  const classes = useStyles();
  const {user, changeActiveRoom, token, rooms, getRooms, joinRoom, leaveRoom } = useContext(GlobalContext)
  const [currentRoom, setCurrentRoom] = useState('General')
  

  
  // Get rooms from the global state
  useEffect(() => {
    getRooms(token)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleListItemClick = room => {
    // Local State
    if(currentRoom !== room ){
      leaveRoom(
        {
        user: user,
        room: currentRoom
        }
      )
      setCurrentRoom(room)
      // Global State
      joinRoom(
        {
          user: user,
          room: room
        }
      )
      changeActiveRoom(room)
    }
  };
  

  const drawerContent = (
    <div className={classes.root}>
      <Divider />
      <List>
      <ListItem>
        <Typography variant="h5">Chat Rooms</Typography>
      </ListItem>
      <ListItem>
        <Divider></Divider>
      </ListItem>
      {rooms.filter(room => room.status === 'Active').map(room => (
        <ListItem
          className={classes.listRoot}
          alignItems="flex-start"
          key={room.name}
          button
          onClick={e => {
            handleListItemClick(e.target.innerText)        
          }}
        >
          <ListItemText
            variant="body2"
            color={classes.color}
            className={classes.inline}
            primary={room.name}
          />
        </ListItem>
        ))}
      </List>
      </div>
  )
  return (
    <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        {drawerContent}
    </Drawer>  
  );
};


