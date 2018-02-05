import React from 'react';
import { FormLabel, Button, FormInput, Text } from 'react-native-elements';
import { View, StyleSheet, Image } from 'react-native';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';
import { openMapModal } from '../actions/modal_actions';
import { modifyMyItem, removeMyItem } from '../actions/my_items_actions';
import ImagePicker from 'react-native-image-picker';
import GeneralMapModal from '../modals/general_map_modal';
import { addMyChat } from '../actions/chat_actions';
import { isLoading } from '../actions/loading_actions';

const NUMBER_OF_MODIFIABLE_PARAMS = 4;

var options = {
    title: 'Select image',
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
};



class GeneralItemScreen extends React.Component {


    render(){
        return(
            <View style={{flex: 1}}>
                <GeneralMapModal markerPositionCoords={this.props.navigation.state.params.pickUpLocation}/>
                <View style={styles.containerStyle}>
                    <Image style={{height: 150, width: 150, alignItems: 'center'}} source={{uri: ""+this.props.navigation.state.params.image}} />
                    <FormLabel labelStyle={styles.labelStyle}>{this.props.navigation.state.params.title}</FormLabel>
                    <FormLabel labelStyle={styles.labelStyle}>{this.props.navigation.state.params.note}</FormLabel>
                    <Button 
                        title="Vedi luogo d'incontro" 
                        backgroundColor={"#107896"}
                        containerViewStyle = {styles.buttonStyle}
                        onPress= {() => {
                            this.props.openMapModal();
                        }}
                    /> 
                    <Button 
                        title="Contatta" 
                        backgroundColor={"#107896"}
                        containerViewStyle = {styles.buttonStyle}
                        loading={this.props.isLoadingS}
                        disabled={this.props.isLoadingS}
                        onPress= {() => {
                            var alreadyExists = false;
                            if (this.props.chats != undefined) {
                                for (var chat in this.props.chats) {
                                    if (this.props.chats[chat].objectId == this.props.navigation.state.params.itemId && this.props.chats[chat].sellerId == this.props.navigation.state.params.uid){
                                        alreadyExists = true;
                                    }
                                }
                            }
                            if (!alreadyExists){
                                this.props.isLoading({isLoading: true});
                                this.props.addMyChat({message: {_id: 1, text: "Oggetto " + this.props.navigation.state.params.title, createdAt: new Date(), system:true}, sellerId: this.props.navigation.state.params.uid, objectId: this.props.navigation.state.params.itemId});
                            }
                            chatIndex = 0;
                            for (i=0; i<this.props.myChats.length; i++){
                                if (this.props.myChats[i].sellerId == this.props.navigation.state.params.uid && this.props.myChats[i].objectId == this.props.navigation.state.params.itemId){
                                    chatIndex = i;
                                }
                              }
                            if(chatIndex != 0) {
                                this.props.navigation.navigate("ChatPageScreen", {objectId: this.props.navigation.state.params.itemId, sellerId: this.props.navigation.state.params.uid, chatId: 1, buyerUid: this.props.userID, chatIndex: chatIndex});
                            }
                        }}
                    /> 
                    <Text> Premere due volte se è la prima volta che si contatta </Text>
                </View>
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeMyItem: (itemId) => {
            dispatch(removeMyItem(itemId));
        },
        modifyMyItem: (modifiedItem) => {
            dispatch(modifyMyItem(modifiedItem));
        },
        openMapModal: () => {
            dispatch(openMapModal());
        },
        addMyChat: (toMyChat) => {
            dispatch(addMyChat(toMyChat));
        },
        isLoading: (value) => {
            dispatch(isLoading(value));
        }
    }
}

const mapStateToProps = (state) => {
    return {
        chats: state.authenticationReducer.chats,
        userID: state.authenticationReducer.userID,
        myChats: state.chatsReducer.myChats,
        isLoadingS: state.authenticationReducer.isLoading
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GeneralItemScreen);



const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#BBDEFB'
    },
    buttonStyle: {
        width: '50%',
        marginTop: 20,
    },
    inputStyle: {
        width: '100%',
        color: "black",
    },
    labelStyle: {
        color: "black"
    }
})
