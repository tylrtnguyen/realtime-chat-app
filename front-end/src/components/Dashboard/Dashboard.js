import React, {useState, useEffect, useContext} from 'react'
import clsx from 'clsx'
import { Redirect } from 'react-router-dom'
import Unauthorized from '../Unauthorized/Unauthorized'
import { getLoginStatus } from '../Helper/Helper'
import { ListItems } from './ListItems'
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import List from '@material-ui/core/List'
import Total from './Total'
import Button from '@material-ui/core/Button'
import { UseStyles } from './UseStyles'
import { GlobalContext } from '../../context/GlobalState'
import { getAdmins, getEvents, getToken } from '../Helper/Helper'



function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Theme By Material UI
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

export default function Dashboard(){
    // Custom Styles
    const classes = UseStyles();
    // Global State
    const {rooms, getRooms, users, getUsers} = useContext(GlobalContext)
    // Local State
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [ navigate, setNavigate ] =useState(false)
    const [admins, setAdmins] = useState([])
    const [events, setEvents] = useState([])
    
    
    

    const [open, setOpen] = React.useState(true);
        const handleDrawerOpen = () => {
            setOpen(true);
        };
        const handleDrawerClose = () => {
            setOpen(false);
        };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    // Pass [] as the second parameter to avoid activating it on component
    // updates but only for the mounting of the component.
    useEffect(() => {
        const authStatus = getLoginStatus()
        setIsLoggedIn(authStatus)
        getRooms()
        getUsers()
        /* Get admins and events */
        const token = getToken()
        async function getAuthDatas(token){
            const adminResult = await getAdmins(token)
            setAdmins(adminResult.data.data)
            console.log(adminResult.data.data)
            const eventResult = await getEvents(token)
            setEvents(eventResult.data.data)
        }
        getAuthDatas(token)
    }, [])

    const handleLogOut= () => {
        setIsLoggedIn(false)
        setNavigate(true)
        localStorage.removeItem('login')
        localStorage.removeItem('token')
    }

    if(navigate) {
        return <Redirect to="/" push={true} />;
    }
    if(isLoggedIn){
        return (
            <div className={classes.root}>
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
                  Dashboard
                </Typography>
                <Typography className={classes.paddingRight} variant="h6">Hello, Thong</Typography>
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
            <main className={classes.content}>
              <div className={classes.appBarSpacer} />
              <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                   {/* Total Users */}
                    <Grid item xs={12} md={6} lg={6}>
                    <Paper className={fixedHeightPaper}>
                        <Total title="Users" total={users.length}/>
                    </Paper>
                    </Grid>
                    {/* Total Events */}
                    <Grid item xs={12} md={6} lg={6}>
                        <Paper className={fixedHeightPaper}>
                            <Total title="Events" total={events.length}/>
                        </Paper>
                    </Grid>
                    {/* Total rooms */}
                    <Grid item xs={12} md={6} lg={6}>
                        <Paper className={fixedHeightPaper}>
                            <Total title="Rooms" total={rooms.length}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <Paper className={fixedHeightPaper}>
                            <Total title="Admins" total={admins.length}/>
                        </Paper>
                    </Grid>

                </Grid>
                <Box pt={4}>
                  <Copyright />
                </Box>
              </Container>
            </main>
          </div>
        )
    }
    else{
        return (
        <Unauthorized />
        )
    }
    
}