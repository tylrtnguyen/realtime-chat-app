import React, { useState } from 'react'
import { CssBaseline, AppBar, Toolbar, Typography, 
        Button, IconButton, Drawer, Divider, List } from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { Redirect } from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx'
import { ListItems } from './SubComponents/ListItems'
import { UseStyles } from './UseStyles'

export default function StaticToolbar(props) {
    const { title } = props
    const classes = UseStyles();
    const [ navigate, setNavigate ] =useState(false)

    const [open, setOpen] = React.useState(true);
        const handleDrawerOpen = () => {
            setOpen(true);
        };
        const handleDrawerClose = () => {
            setOpen(false);
        };
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const handleLogOut= () => {
      setNavigate(true)
      localStorage.removeItem('role')
      localStorage.removeItem('token')
    }

    if(navigate) {
      return <Redirect to="/" push={true} />;
    }
    return (
    <div className="AppBarContainer">
        <CssBaseline />
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
              <Toolbar className={classes.toolbar}>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                >
                  <MenuIcon />
                </IconButton>
                <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                   {title}
                </Typography>
                <Typography className={classes.paddingRight} variant="h6">Hello, Admin</Typography>
                <Button variant="contained" onClick={handleLogOut}>Logout</Button>
              </Toolbar>
            </AppBar>
            <Drawer
              variant="permanent"
              classes={{
                paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
              }}
              open={open}
            >
              <div className={classes.toolbarIcon}>
                <IconButton onClick={handleDrawerClose}>
                  <ChevronLeftIcon />
                </IconButton>
              </div>
              <Divider />
              <List>{ListItems}</List>
            </Drawer>
    </div>
        
    )
}