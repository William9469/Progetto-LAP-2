import { combineReducers } from 'redux';
import authenticationReducer from './authentication_reducer';
import modalsReducer from './modals_reducer';
import myItemsReducer from './my_item_reducer';
import chatsReducer from './chats_reducer';

export default combineReducers({
        authenticationReducer,
        modalsReducer,
        myItemsReducer,
        chatsReducer
})