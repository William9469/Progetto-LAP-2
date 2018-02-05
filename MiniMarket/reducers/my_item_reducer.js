import {
    UPDATE_MY_ITEMS,
    REMOVE_ITEM,
    MODIFY_ITEM,
} from '../actions/types';

const INITIAL_STATE = {
    myItems : [{
        title: '',
        note: '',
        pickUpLocation: {
            latitude: 0,
            longitude: 0,
        },
        imageRef: '',
        itemId: '',
    }],
    items : [{
        title: '',
        note: '',
        pickUpLocation: {
            latitude: 0,
            longitude: 0,
        },
        imageRef: '',
        itemId: '',
    }]
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type){
        case UPDATE_MY_ITEMS: {
            return {
                ...state,
                myItems: action.myItems,
                items: action.items
            }
        }
        case REMOVE_ITEM: {
            return {
                ...state
            }
        }
        case MODIFY_ITEM: {
            return {
                ...state
            }
        }
        default: {
            return state;
        }
    }
}


