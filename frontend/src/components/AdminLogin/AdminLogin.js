import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { SubmitValidate } from '../../utils/FormValidate/FormValidate'
import { useHistory } from 'react-router-dom'
import { useStyles } from './UseStyles'
import axios from 'axios'




export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()
  const classes = useStyles();
  const SERVER = "https://api-chat-react.herokuapp.com"


  const handleSubmit = (event) => {
      axios.post(`${SERVER}/login`,
      {
          email,
          password     
      }).then(response => {
          // Set login status
          localStorage.setItem('role',response.data.role)
          // Set token value
          localStorage.setItem('token',response.data.token)
          history.push('/dashboard')
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
          Admin Login
        </Typography>
        <form method="POST" className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange = {e => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled = {!SubmitValidate(email, password)}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}