import axios from 'axios'


export const getLoginStatus = () => {
    return localStorage.getItem('login')
}

export const checkAuthorization = () => {
    return localStorage.getItem('role') === 'admin'
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
            'Content-Type': 'Application/json',
            'Authorization': `Bearer ${token}`
        }
    }
    try {
        const admins = await axios.get('/api/admin', config)
        return admins
    }
    catch (err) {
        return err.name
    }
}

export const getEvents = async (token) => {
    const config = {
        headers: {
            'Content-Type': 'Application/json',
            'Authorization': `Bearer ${token}`
        }
    }
    try {
        const events = await axios.get('/api/eventlog', config)
        return events
    }
    catch (err) {
        return err.name
    }
}


