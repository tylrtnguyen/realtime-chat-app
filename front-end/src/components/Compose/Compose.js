import React, { useState } from 'react'
import Input from '@material-ui/core/Input';
import { useStyles } from './UseStyles'
import { MessageValidate } from '../FormValidate/FormValidate'
import Button from '@material-ui/core/Button'
import SendIcon from '@material-ui/icons/Send';
import { CTX } from '../Store/Store';

export default function Compose() {
    const classes = useStyles()
    const [message, setMessage] = useState("")
    const {sendChatAction, user, getActiveRoom} = React.useContext(CTX)

    return (
        <div className={classes.compose}>
            <Input
                className={classes.composeInput}
                type="text"
                name="message"
                value = {message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Type a message">
            </Input>
            <div className={classes.button}>
            <Button 
                variant="contained" 
                color="primary"
                disabled={!MessageValidate(message)}
                onClick={() => {
                    sendChatAction({author: user, message: message, room: getActiveRoom()})
                    setMessage("")
                }}>
                <SendIcon></SendIcon>
                    Send
            </Button>
            </div>
        </div>
    )
}