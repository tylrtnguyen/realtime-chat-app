import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import DeveloperModeIcon from '@material-ui/icons/DeveloperMode';
import { Link } from 'react-router-dom';
import { useStyles } from './UseStyles'

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
          <DeveloperModeIcon />
          <Link to="/" className={classes.link}>DevConnector</Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}