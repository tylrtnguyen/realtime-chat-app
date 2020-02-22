import React from 'react'
import io from 'socket.io-client'

/*
{
    chat: {
        author: "username",
        message: "message",
        room: "general"
    }

    state {
        room1: {
            {chat}, {chat}, {chat}
        }
        room2: {
            {chat}, {chat}, {chat}
        }
    }
    
}
*/

export const CTX = React.createContext();

const reducer = (state, action) => {
    const {author, message, room} = action.payload
    switch(action.type){
        case "RECEIVE_MESSAGE":
            return {
                // Maintain the old state
                ...state,
                [room]: [
                    ...state[room],
                    {
                        author,
                        message
                    }
                ]
            }
        default:
            return state
    }
}

const initState = {
    Angular: [
        {author: 'Thong Nguyen', message:'Tao la thong ne'},
        {author: 'Tyler Nguyen', message:'Tao la thong ne'},
        {author: 'Datvid Tran', message:'Tao la thong ne'}
    ],
    React: [
        {author: 'Thong Nguyen', message:'Tao la thong ne'},
        {author: 'Tyler Nguyen', message:'Tao la thong ne'},
        {author: 'Datvid Tran', message:'Tao la thong ne'}
    ]
}

// Prevent from rerender everytime the store reload
let socket;


// Send Chat to server
const sendChatAction = (value) => {
    socket.emit('chat message', value)
}





export default function Store(props) {

    const [allChats, dispatch] = React.useReducer(reducer, initState)

    if(!socket){
        socket = io(":5000")
        socket.on('chat message', function(msg) {
            // dispatch({type:'RECEIVE_MESSAGE', payload: msg})
            console.log(msg)
        })
    }

    // Create 1 manual user
    const user = "Tyler" + Math.random(100).toFixed(2)

    

    return (
        <CTX.Provider value={{allChats, sendChatAction, user}}>
            {props.children}
        </CTX.Provider>
    )
}