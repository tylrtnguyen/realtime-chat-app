import React, { useEffect, useContext } from 'react'
import StaticToolbar from './StaticToolbar'
import { CustomTable } from './SubComponents/Table'
import { UseStyles } from './UseStyles'
import { GlobalContext } from '../../context/GlobalState'

export default function ChatsReport() {
    const classes = UseStyles()
    const { chats, getChats } = useContext(GlobalContext)

    useEffect(() => {
        const fetchChat = async (token) => {
            await getChats(token)
        }
        const token = localStorage.getItem('token')
        fetchChat(token)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <div className={classes.root}>
            <StaticToolbar title="Chat Report" />
            <CustomTable objectArray={chats}/>
        </div>
    )
}