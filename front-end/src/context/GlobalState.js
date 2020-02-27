import React, { createContext, useReducer, useState, useEffect} from 'react'
import AppReducer from './AppReducer'
import io from 'socket.io-client'
import axios from 'axios'



// Declare initialState for application
const initialState = {
  chats:[],
  rooms:[],
  users:[],
  events:[],
  admins:[],
  active_room: 'General',
  error: null,
  loading: true,
  user:''
}


let socket;


// Send Chat to server
const sendChatAction = (value) => {
    socket.emit('chat message', value)
}

const sendEvent = (event) => {
    socket.emit('send event', event)
}

const sendUser = (user) => {
    socket.emit('user joined', user)
}

const sendRoom = (room='General') => {
  socket.emit('join room', room)
}

const changeActiveRoom = (room) => {
    socket.emit('leave room', room)
}

// Create context
export const GlobalContext = createContext()
// Provider Component
export const GlobalProvider = ({children}) => {
    const [user, setUser] = useState('')
    const [activeRoom, changeActiveRoom ] = useState('General')
    const [state, dispatch] = useReducer(AppReducer, initialState)


    // Socket.io client implementation    
    if(!socket){    
      socket = io(":5000")
      socket.on('chat message', function(msg) {
          addChat(msg)
      })
      
      socket.on('user joined', function(user){
        console.log(user)
          addUser(user)
          addEvent()
      })

      socket.on('join room', function(room) {
        console.log(room)
          addEvent()
      })

      socket.on('leave room', function(room) {
          addEvent()
      })
  }   


    // Get all chats from the DB
    const getChats = async () => {
        try {
          const res = await axios.get('/api/chat');
            
          dispatch({
            type: 'GET_CHATS',
            payload: res.data.data
          });
        } catch (err) {
          dispatch({
            type: 'CHAT_ERROR',
            payload: err.response.data.error
          });
        }
    }

    const getUsers = async () => {
      try {
        const res = await axios.get('/api/user');
          
        dispatch({
          type: 'GET_USERS',
          payload: res.data.data
        });
      } catch (err) {
        dispatch({
          type: 'USER_ERROR',
          payload: err.response.data.error
        });
      }
  }

    // Get all rooms from the DB
    const getRooms = async () => {
        try {
          const res = await axios.get('/api/room');
    
          dispatch({
            type: 'GET_ROOMS',
            payload: res.data.data
          });
        } catch (err) {
          dispatch({
            type: 'ROOM_ERROR',
            payload: err.response.data.error
          });
        }
    }

    // const changeRoom = async () => {
    // }

    // Add new chat to the DB
    const addChat = async (chat) => {
        const config = {
            headers: {
              'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/chat', chat, config);

            dispatch({
              type: 'ADD_CHAT',
              payload: res.data.data
            });
        }
        catch (err) {
          dispatch({
            type: 'CHAT_ERROR',
            payload: err.response.data.error
          });
        }
    }

    // Add User
    const addUser = async (user) => {
      const config = {
          headers: {
            'Content-Type': 'application/json'
          }
      }

      try {
          const res = await axios.post('/api/user', user, config);

          dispatch({
            type: 'ADD_USER',
            payload: res.data.data
          });
      }
      catch (err) {
        dispatch({
          type: 'USER_ERROR',
          payload: err.response.data.error
        });
      }
  }


    return (
        <GlobalContext.Provider value={{
          /* List of items */
            chats: state.chats,
            rooms: state.rooms,
            error: state.error,
            users: state.users,
            loading: state.loading,
            /* Socket methods*/
            sendChatAction,
            sendEvent,
            sendUser,
            /* user getter and setter */
            user,
            setUser,
            activeRoom,
            changeActiveRoom,
            addChat,
            /* Get list of items */
            getUsers,
            getChats,
            getRooms
            }}>
            {children}
        </GlobalContext.Provider>
    )
}