import firebase from 'react-native-firebase';
import { UPDATE_CHATS, UPDATE_MY_CHATS, UPDATE_CHATS_MODIFIED } from './types';
import { updateChatsAuth } from './login_actions';
import { isLoading } from '../actions/loading_actions';


const updateChatsToThunk = (payload) => {
    return {
        type: UPDATE_CHATS,
        chat: payload.chat,
    }
}

const updateChatsModifedToThunk = (payload) => {
    return {
        type: UPDATE_CHATS_MODIFIED,
        chats: payload.chats
    }
}

export const updateChats = () => {
    return function(dispatch, getState) {
        sellerUid = getState().authenticationReducer.userID;
        firebase.database().ref("/chats/" + sellerUid).on("value", (snapshot) => {
            items = snapshot.val();
            if (!(items == null)){
                for (const item in items) {
                    object = items[item];
                    for(const buyerId in object){
                        chats = JSON.parse(JSON.stringify(getState().chatsReducer.chats));
                        newChats = object[buyerId]
                        systemMessage = newChats.systemMessage;
                        delete newChats.systemMessage;
                        prova = Object.values(newChats);
                        dateIndex = [];
                        alreadyExists = false;
                        for (i=0; i<prova.length; i++) {
                            dateIndex.push({index: i, createdAt: prova[i].message.createdAt})
                        }
                        dateIndex.sort((a,b) => {
                            var dateA = new Date(a.createdAt);
                            var dateB = new Date(b.createdAt);
                            return dateB-dateA
                        })
                        messages = [];
                        for (i=0; i<dateIndex.length; i++){
                            messages.push(prova[dateIndex[i].index].message);
                        }
                        messages.push(systemMessage)    
                        for (chat in chats) {
                            if (chats[chat].buyerId == buyerId && chats[chat].objectId == item){
                                chats[chat].messages = messages;
                                alreadyExists = true;
                                dispatch(updateChatsModifedToThunk({chats: chats}));
                            }
                        }
                        if(!alreadyExists){
                            dispatch(updateChatsToThunk({chat: {buyerId: buyerId, objectId: item, messages: messages}}))
                        }
                    }
                }
            }
        })
    }
}



const updateMyChatsToThunk = (payload) => {
    return {
        type: UPDATE_MY_CHATS,
        myChats: payload.myChats,
        sellerId: payload.sellerId,
        objectId: payload.objectId
    }
}



export const updateMyChats = () => {
    return function(dispatch, getState) {
        chats = getState().authenticationReducer.chats;
        buyerUid = getState().authenticationReducer.userID;
        myChats = JSON.parse(JSON.stringify(getState().chatsReducer.myChats));
        if ( chats != undefined) {
            for (const chat in chats) {
                firebase.database().ref("/chats/" + chats[chat].sellerId + "/" + chats[chat].objectId + "/" + buyerUid + "/").on("value", (snapshot) => {
                    newChats = snapshot.val();
                    systemMessage = newChats.systemMessage;
                    delete newChats.systemMessage;
                    chats = getState().authenticationReducer.chats;
                    if ( !(newChats == undefined)){
                        prova = Object.values(newChats);
                        dateIndex = [];
                        alreadyExists = false;
                        for (i=0; i<prova.length; i++) {
                            dateIndex.push({index: i, createdAt: prova[i].message.createdAt})
                        }
                        dateIndex.sort((a,b) => {
                            var dateA = new Date(a.createdAt);
                            var dateB = new Date(b.createdAt);
                            return dateB-dateA
                        })
                        messages = [];
                        for (i=0; i<dateIndex.length; i++){
                            messages.push(prova[dateIndex[i].index].message);
                        }
                        messages.push(systemMessage);
                        
                        for (const newMyChat in myChats) {
                            if (myChats[newMyChat].sellerId == chats[chat].sellerId && myChats[newMyChat].objectId == chats[chat].objectId) {
                                myChats[newMyChat].messages = messages;
                                alreadyExists = true;
                                break;
                            }
                        }
                        if(!alreadyExists){
                            myChats.push({sellerId: chats[chat].sellerId, objectId: chats[chat].objectId, messages: messages})
                        }
                    }
                    else {
                        myChats.push({sellerId: chats[chat].sellerId, objectId: chats[chat].objectId, messages: systemMessage})
                    }
                    dispatch(updateMyChatsToThunk({myChats: myChats}))
                })
            }
        }
    }
}

export const addMyChat = (payload) => {
    return function(dispatch, getState) {
        myChats = getState().chatsReducer.myChats;
        buyerUid = getState().authenticationReducer.userID;
        firebase.database().ref("/chats/" + payload.sellerId + "/" + payload.objectId + "/" + buyerUid +"/").set({systemMessage: payload.message})
        .then(() => {
            firebase.database().ref("/users/" + buyerUid + "/chats/").push().set({sellerId: payload.sellerId, objectId: payload.objectId})
            firebase.database().ref("/chats/" + payload.sellerId + "/" + payload.objectId + "/" + buyerUid + "/").on("value", (snapshot) => {
                newChats = snapshot.val();
                systemMessage = newChats.systemMessage;
                delete newChats.systemMessage;
                if ( !(newChats == undefined)){
                    prova = Object.values(newChats);
                    dateIndex = [];
                    alreadyExists = false;
                    for (i=0; i<prova.length; i++) {
                        dateIndex.push({index: i, createdAt: prova[i].message.createdAt})
                    }
                    dateIndex.sort((a,b) => {
                        var dateA = new Date(a.createdAt);
                        var dateB = new Date(b.createdAt);
                        return dateB-dateA
                    })
                    messages = [];
                    for (i=0; i<dateIndex.length; i++){
                        messages.push(prova[dateIndex[i].index].message);
                    }
                    messages.push(systemMessage)
                    for (var newMyChat in myChats) {
                        if (myChats[newMyChat].sellerId == payload.sellerId && myChats[newMyChat].objectId == payload.objectId) {
                            myChats[newMyChat].messages = messages;
                            alreadyExists = true;
                            break;
                        }
                    }
                    if(!alreadyExists){
                        myChats.push({sellerId: payload.sellerId, objectId: payload.objectId, messages: messages})
                    }
                }
                else {
                    myChats.push({sellerId: payload.sellerId, objectId: payload.objectId, messages: systemMessage})
                }
                dispatch(updateMyChatsToThunk({myChats: myChats}))
                dispatch(updateChatsAuth());
                dispatch(isLoading({isLoading: false}));
            })
        })
    }
}

export const sendMessage = (payload) => {
    return function(dispatch, getState) {
        firebase.database().ref("/chats/" + payload.sellerId + "/" + payload.objectId + "/" + payload.buyerUid + "/").push().set({message: payload.message})

    }
}