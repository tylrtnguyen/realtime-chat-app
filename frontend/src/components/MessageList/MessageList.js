import React, {useState, useEffect, useContext} from 'react'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import Toolbar from "../Toolbar/Toolbar";
import PersonIcon from "@material-ui/icons/Person";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
import { MessageValidate } from '../../utils/FormValidate/FormValidate'
import Button from '@material-ui/core/Button'
import SendIcon from '@material-ui/icons/Send';
import Input from '@material-ui/core/Input';
import { GlobalContext } from '../../context/GlobalState' 
import { useStyles } from './UseStyles'
// import ScrollToBottom, { useScrollToBottom, useSticky } from 'react-scroll-to-bottom'



export const MessageList = () => {
    const {chats, activeRoom, sendChatAction, sendUserLeft, 
            getChats, user, token, users, getUsers} = useContext(GlobalContext)
    const [message, setMessage] = useState([])
    const [ navigate, setNavigate ] =useState(false)
    const classes = useStyles()

    useEffect(() => {
      getChats(token)
      getUsers(token)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleLogout = () => {
      sendUserLeft(user)
      setNavigate(true)
    }

    const handleSendMessage = () => {
        sendChatAction({author: user, message: message, room: activeRoom || "General" });
        setMessage("");
    }

    const handleKeypress = (event) => {
        if(event.keyCode === 13){
          handleSendMessage()
        }
        event.preventDefault()
    }

    if(navigate) {
      return <Redirect to="/" push={true} />;
    }
    return(
      <div id="messageList" className={classes.root}>
            <Toolbar
              title={activeRoom}
              rightItems={
              [
                <div>
                <Typography variant="body1">Hello, {user}</Typography>
                  <Button 
                   color="secondary"
                   variant="outlined"
                   onClick={handleLogout}>
                   Logout
                   </Button>
                </div>  
              ]}
              leftItems={[
                <div>
                  <Typography 
                    variant="body1">
                  <PersonIcon></PersonIcon>{users.length}
                  </Typography>
                </div>
              ]}
            />
            <Typography className={classes.textCenter} variant="h6">{moment().format('LLL')}</Typography>
            {/* Message List starts */}
            <div className={classes.messageList}>
              {chats
                .filter(chat => chat.room === activeRoom)
                .map(chat => (
                  <div key={chat._id} className="message-list-container">
                    <Chip
                      icon={<FaceIcon />}
                      key='Icon{chat._id}'
                      label={chat.author}
                      variant="outlined"
                    />
                    <Typography
                      className="inline"
                      key='message{chat._id}'
                      variant="body1"
                    >
                      {chat.message}
                    </Typography>
                  </div>
                ))}
            </div>
            <div className={classes.compose}>
                <Input
                  className={classes.composeInput}
                  type="text"
                  id="inputMessage"
                  name="message"
                  value={message}
                  onKeyUp={e => handleKeypress(e)}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Type a message"
                ></Input>
                <div className={classes.button}>
                  <Button
                    variant="contained"
                    id="sendButton"
                    color="primary"
                    disabled={!MessageValidate(message)}
                    onClick={() => {
                      handleSendMessage()
                    }}
                  >
                    <SendIcon></SendIcon>
                    Send
                  </Button>
                </div>
              </div>
          </div>
    );
}
