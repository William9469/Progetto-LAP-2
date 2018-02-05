import {
    ADD_ITEM,
    REMOVE_ITEM,
    MODIFY_ITEM,
    UPDATE_MY_ITEMS
} from './types';

import firebase from 'react-native-firebase';
import { isLoading } from './loading_actions';

function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
  }

  function generateUUID () { // Public Domain/MIT
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}


export const addItem = (payload) => {
        return function(dispatch){  
            uuid = generateUUID();
            firebase.storage().ref('/itemsImages/' + uuid).putFile(payload.image)
            .then((uploadedImage) => {
                firebase.database().ref("/items/").push().set({title: payload.title, note: payload.note, image: uploadedImage.downloadURL, pickUpLocation: payload.pickUpLocation, uid: firebase.auth().currentUser.uid, imageRef: uuid})
                .then(() => {
                    dispatch(isLoading({isLoading: false}));
                })
            })
        }
}

export const updateMyItems = (payload) => {
    return {
        type: UPDATE_MY_ITEMS,
        myItems: payload.myItems,
        items: payload.items
    }
}

export const removeMyItem = (payload) => {
    return function(dispatch) {
        firebase.database().ref("/items/" + payload.itemId).remove(() => {
            firebase.storage().ref("/itemsImages/" + payload.imageRef).delete().then(() => {
                dispatch(remove());
            })
        })
        .catch((error) => {
            console.log("removeMyItem error: ", error);
        })
    }
}

export const modifyMyItem = (payload) => {
    return function(dispatch) {
        firebase.database().ref("/items/" + payload.itemId).update({title: payload.title, note: payload.note, image: payload.image, pickUpLocation: payload.pickUpLocation}, () => {
            firebase.storage().ref("/itemsImages/" + payload.imageRef).delete().then(() => {
                disaptch(itemModified());
            })
        })
    }
}

const remove = () => {
    return {
        type: REMOVE_ITEM
    }
}

const itemModified = () => {
    return {
        type: MODIFY_ITEM
    }
}

