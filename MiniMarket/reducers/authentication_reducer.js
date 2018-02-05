import { LOG_IN, LOG_OUT, LOADING, LISTENED, UPDATE_CHATS_AUTH } from '../actions/types';

const INITIAL_STATE = {
    loggedIn: false,
    userID: '',
    userEmail: '',
    isLoading: false,
    username: '',
    avatarSource: '',
    chats: [{sellerId: '', objectId: ''}],
}

export default ( state = INITIAL_STATE, action ) => {
    switch(action.type){
        case LOG_IN : {
            return {
                ...state,
                loggedIn: true,
                userID: action.userID,
                userEmail: action.userEmail,
                username: action.username,
                avatarSource: action.avatarSource,
                chats: action.chats,
            }
        };
        case LOG_OUT: {
            return {
                ...state,
                loggedIn: false,
                userID: ''
            }
        }
        case LOADING: {
            return {
                ...state,
                isLoading: action.isLoading
            }
        }
        case UPDATE_CHATS_AUTH: {
            return {
                ...state,
                chats: action.chats,
            }
        }
        default : {
            return state
        } 
    }
}