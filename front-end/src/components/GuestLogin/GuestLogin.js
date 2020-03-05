import React, { useState, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import axios from "axios"
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles'; 
import Container from '@material-ui/core/Container';
import { JoinValidate } from '../FormValidate/FormValidate'
import { useHistory } from 'react-router-dom'
import { GlobalContext } from '../../context/GlobalState'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function GuestLogin() {
  const history = useHistory()
  const [name, setName] = useState('');
  const {setUser, sendUser, setToken} = useContext(GlobalContext)
  const SERVER = "https://api-chat-react.herokuapp.com"
 

  const classes = useStyles();

  const handleJoin = (event) => { 
    axios.post(`${SERVER}/join`,
      {
          name
      }).then(response => {
          // Set token value
          const token = response.data.token
          setToken(token)
          setUser(name)
          sendUser({name, token})
          history.push('/chat')
      }).catch(error => {
        console.log(error)
      })
      // Prevent the page from reloading
      event.preventDefault();
}

  return ( 
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Guest Join
        </Typography>
        <form method="POST" onSubmit={handleJoin} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Your Name Here"
            name="name"
            value={name}
            onChange = {e => setName(e.target.value)}
          />
          <Button 
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!JoinValidate(name)}
          >
            Join Our Chat
          </Button>
        </form>
      </div>
    </Container>
  );
}