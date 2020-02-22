export const getLoginStatus = () => {
    return localStorage.getItem('login')
}

export const getToken = () => {
    return localStorage.getItem('token')
}

export const renderMessage = (messages) => {

}

export const getActiveRoom = (roomName) => {
    return roomName
}