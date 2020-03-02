import React, { useContext, useEffect } from 'react'
import StaticToolbar from './StaticToolbar'
import { CustomTable } from './SubComponents/Table'
import { GlobalContext} from '../../context/GlobalState'
import { UseStyles } from './UseStyles'

  
export default function UsersReport() {
    const {users, getUsers} = useContext(GlobalContext)
    const classes = UseStyles()

    useEffect(() => {
        const fetchUser = async (token) => {
            await getUsers(token)
        }
        const token = localStorage.getItem('token')
        fetchUser(token)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className={classes.root}>
                <StaticToolbar title="User Report" />
                <CustomTable objectArray={users}/>
        </div>
        
    )
}