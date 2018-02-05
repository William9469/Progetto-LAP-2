import { LOG_IN, LOG_OUT, LOADING, UPDATE_CHATS_AUTH } from './types'
import firebase from 'react-native-firebase';
import {Alert} from 'react-native';
import { isLoading } from './loading_actions';

export const logIn = (payload) => {
    return ({type: LOG_IN, userID: payload.userID, userEmail: payload.userEmail, username: payload.username, avatarSource: payload.avatarSource, chats: payload.chats})
}

export const signOut = (payload) => {
    return ({type: LOG_OUT})
}

const updateChatsAuthToThunk = (payload) => {
    return {
        type: UPDATE_CHATS_AUTH,
        chats: payload.chats
    }
}


export const updateChatsAuth = () => {
    return function(dispatch, getState){
        uid = getState().authenticationReducer.userID
        firebase.database().ref('/users/' + uid + '/chats').once("value", (snapshot) => {
            dispatch(updateChatsAuthToThunk({chats: snapshot.val()}))
        })
    }

}

export const logInThunk = (payload) => {
    if (payload.email == '' || payload.password == ''){
        return function(dispatch) {
            Alert.alert("email and/or password can't be empty");
            dispatch(isLoading({isLoading: false}));
        }
    }
    else{
        return function(dispatch) {
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
            .then((user) => {
                firebase.database().ref('/users/' + user.uid).once("value", (snapshot) => {
                    dispatch(logIn({userID: firebase.auth().currentUser.uid, userEmail: firebase.auth().currentUser.email, username: snapshot.val().username, avatarSource: snapshot.val().image, chats: snapshot.val().chats}))
                    dispatch(isLoading({isLoading: false}))
                })

                

            })
            .catch((error) => {
                Alert.alert("Error", "3"+error);
                console.log(error);
                dispatch(isLoading({isLoading: false}))
            });
            
        }
    }

}

export const signUpThunk = (payload) => {
    if (payload.email == '' || payload.password == '' || payload.confirmPassword == '' || payload.username == '' || payload.avatarSource == undefined){
        return function(dispatch) {
            Alert.alert("all field must be filled");
            dispatch(isLoading({isLoading: false}))
        }
    }
    else{
        return function(dispatch) {
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
            .then( (user) => {
                firebase.storage().ref('/userAvatars/' + user.uid).putFile(payload.avatarSource)
                .then((uploadedFile) => {
                    firebase.database().ref('users/' + firebase.auth().currentUser.uid).set({username: payload.username ,image: uploadedFile.downloadURL})
                    dispatch(logIn({userID: user.uid, userEmail: user.email, username: payload.username, avatarSource: uploadedFile.downloadURL}))
                    dispatch(isLoading({isLoading: false}))
                })
            })
            .catch((error) => {
                dispatch(isLoading({isLoading: false}))
                Alert.alert(""+error);
                console.log(error);
            })
        }
    }

}

export const signOutThunk = (payload) => {
    return function(dispatch){
        firebase.auth().signOut()
        .then(() => {
            dispatch(signOut())
        })
    }
}