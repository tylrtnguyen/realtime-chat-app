export default (state, action) => {
    switch(action.type){
        case 'GET_CHATS':
            return {
                ...state,
                loading: false,
                chats: action.payload
            }
        case 'GET_ROOMS':
            return {
                ...state,
                loading: false,
                rooms: action.payload
            }
        case 'GET_USERS':
            return {
                ...state,
                loading: false,
                users: action.payload
            }
        case 'CHANGE_ROOM':
            return {
                ...state,
                active_room: action.payload
            }
        case 'ADD_CHAT':
            return {
            ...state,
            chats: [...state.chats, action.payload]
        }
        case 'CHAT_ERROR':
            return {
                ...state,
                error: action.payload
            }
        case 'USER_ERROR':
            return {
                ...state,
                error: action.payload
            }   
        case 'ADD_USER':
            return {
                ...state,
                users: action.payload
            }
        default:
            return state
    }
}