import axios from 'axios'


export const getLoginStatus = () => {
    return localStorage.getItem('login')
}

export const getToken = () => {
    return localStorage.getItem('token')
}

export const getActiveRoom = (roomName) => {
    return roomName
}

export const getAdmins = async (token) => {
    const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
    }
    const admins = await axios.get('/api/auth/admin', config)
    return admins
}

export const getEvents = async (token) => {
    const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
    }
    const events = await axios.get('/api/auth/event', config)
    return events
}