// Basic boilerplate for every component
import React, {useContext} from "react";
import { MessageList } from "../MessageList/MessageList";
import Grid from "@material-ui/core/Grid";
import { GlobalContext } from "../../context/GlobalState"
import { RoomList } from '../RoomList/RoomList'
import Unauthorized from '../Unauthorized/Unauthorized'


const Chat = () => {  
  const { user } = useContext(GlobalContext)

  if (!user){
    return (
      <Unauthorized />
    );
  }
  else {
    return (
      <div className="container">
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <RoomList />
          </Grid>
          <Grid item xs={9}>
            <MessageList />
          </Grid>
        </Grid>
      </div>
    )
  }
  
};
export default Chat;
