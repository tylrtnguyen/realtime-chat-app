// Basic boilerplate for every component
import React, { useState } from 'react';
import { MessageList } from '../MessageList/MessageList'
import Grid from '@material-ui/core/Grid';
import Toolbar from '../Toolbar/Toolbar'
import PersonIcon from '@material-ui/icons/Person';
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles'
import { CTX } from '../Store/Store'
   


const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2)
      },
    },
  }));

const Chat = () => {
    // Get context
    const {allChats, setActiveRoom} = React.useContext(CTX)
    const rooms = Object.keys(allChats)
    // Local State
    // const [selectedIndex, setSelectedIndex] = useState("");
    const [activeRoom, changeActiveRoom] = useState(rooms[0])
    // Custom Styles
    const classes = useStyles()
      

    console.log(allChats)

    const handleListItemClick = (room) => {
        changeActiveRoom(room)
    };

  return (
      <div className="container">
        <Grid container spacing={3}>
            <Grid item xs={3}>
                <List>
                  <ListItem>
                    <Typography variant="h5">Room</Typography>
                  </ListItem>
                  {
                    rooms.map(room => (
                      <ListItem 
                      className={classes.listRoot}
                       alignItems="flex-start"
                      key={room}
                      button
                      onClick={e => handleListItemClick(e.target.innerText)}>
                      <ListItemText
                      variant="body2"
                      className={classes.inline}
                      primary={`#`+room}
                      />
                      </ListItem>
                    ))
                  }
                </List>
            </Grid>
            <Grid item xs={9}>
                <div className={classes.root}>
                <Toolbar 
                  title={activeRoom}
                  rightItems={[
                  <Typography key="activeUser" variant="body1">30</Typography>,
                  <PersonIcon key="person" className={classes.iconPadding}></PersonIcon>  
                  ]}
                />
                <MessageList />
                </div>
            </Grid>
        </Grid>
      </div>
      
   
  );
};
export default Chat;