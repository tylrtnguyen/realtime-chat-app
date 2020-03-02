import React, {useState, useEffect, useContext} from 'react'
import clsx from 'clsx'
import Unauthorized from '../Unauthorized/Unauthorized'
import {  Box, Typography, Container, Grid, Paper,Link } from '@material-ui/core'
import Total from './SubComponents/Total'
import { UseStyles } from './UseStyles'
import { GlobalContext } from '../../context/GlobalState'
import { getToken, checkAuthorization } from '../Helper/Helper'
import StaticToolbar from './StaticToolbar'



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
    const {rooms, users, events, chats, getRooms, getUsers, getEvents, getChats} = useContext(GlobalContext)
    // Local State
    const [hasToken, setHasToken] = useState(false)
    const [isAuthorized, setIsAuthorized] = useState(false)

    
    

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    // Pass [] as the second parameter to avoid activating it on component
    // updates but only for the mounting of the component.
    useEffect(() => {
      const token = getToken()
      const hasToken = token === null ? false : true
      setHasToken(hasToken)
      const authStatus = checkAuthorization()
      setIsAuthorized(authStatus)
      // Global state
      const fetchData = async (token) => {
        await getUsers(token)
        await getRooms(token)
        await getEvents(token)
        await getChats(token)
      }
      fetchData(token)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    

    if(hasToken && isAuthorized){
        return (
            <div className={classes.root}>
            <StaticToolbar title="Dashboard" />
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
                            <Total title="Messages" total={chats.length}/>
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