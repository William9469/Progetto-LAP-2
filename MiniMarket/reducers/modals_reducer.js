import {
    OPEN_MAP_MODAL,
    CLOSE_MAP_MODAL
} from '../actions/types';

const INITIAL_STATE = {
    mapModalIsOpen: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type){
        case OPEN_MAP_MODAL: {
            return {
                ...state,
                mapModalIsOpen: action.payload
            }
        }
        case CLOSE_MAP_MODAL: {
            return {
                ...state,
                mapModalIsOpen: action.payload
            }
        }
        default: {
            return state;
        }
    }
}