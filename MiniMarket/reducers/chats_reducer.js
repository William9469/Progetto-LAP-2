import { UPDATE_CHATS, UPDATE_MY_CHATS, UPDATE_CHATS_MODIFIED } from '../actions/types';

const INITIAL_STATE = {
    myChats: [{
        sellerId: '1',
        objectId: '',
        messages: [{
            _id: 1,
            text: 'Non ci sono messaggi',
            createdAt: new Date(),
            system:true,
        }]
    }],
    chats: [{
        buyerId: '2',
        objectId: '',
        messages: [{
            _id: 1,
            text: 'Non ci sono messaggi',
            createdAt: new Date(),
            system:true,
        }]
    }]
}

export default ( state = INITIAL_STATE, action ) => {
    switch(action.type) {
        case(UPDATE_CHATS): {
            return {
                ...state,
                chats: [...state.chats, action.chat]
            }
        }
        case(UPDATE_MY_CHATS): {
            return {
                ...state,
                myChats: action.myChats
            }
        }
        case (UPDATE_CHATS_MODIFIED): {
            return {
                ...state,
                chats: action.chats
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}