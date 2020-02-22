// Basic boilerplate for every component
import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import { useStyles } from './UseStyles'
import Typography from '@material-ui/core/Typography'
import AddRoomDialog from '../AddRoomDialog/AddRoomDialog'



export const RoomList = () => {
    const classes = useStyles();
    const [selectedIndex, setSelectedIndex] = useState(1);


    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
        event.preventDefault()
    };

  return (
    <h1></h1>
  );
};