import React, { useEffect, useContext} from 'react'
import StaticToolbar from './StaticToolbar'
import { CustomTable } from './SubComponents/Table'
import { UseStyles } from './UseStyles'
import { GlobalContext } from '../../context/GlobalState'

  
export default function EventsReport() {
    const classes = UseStyles()
    const { events, getEvents } = useContext(GlobalContext)
    

    useEffect(() => {
        const fetchEvent = async (token) => {
            await getEvents(token)
        }
        const token = localStorage.getItem('token')
        fetchEvent(token)
    }, [])


    return (
        <div className={classes.root}>
                <StaticToolbar title="Event Report" />
                <CustomTable objectArray={events}/>
        </div>
        
    )
}