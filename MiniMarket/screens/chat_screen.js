import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import ChatList from '../components/chat_list';


class ChatsScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            something: true
        }
    }

    debugLog = () =>{
        this.setState({something: true});
    }


    render(){
        return (
            <View style={styles.containerStyle}>
                <Button 
                        title="Ricarica" 
                        backgroundColor={"#107896"}
                        onPress= {() => {
                            this.debugLog();
                        }}
                    />
                <View style={{alignItems: 'center'}}>
                    <Text >Miei oggetti</Text>
                </View> 
                
                <View style={{flex: 0.5}}>
                    <FlatList
                        data = {this.props.myChats}
                        renderItem = { (item) => {
                            if (item.item.messages[item.item.messages.length-1].text == "Send a message to update"){
                                return;
                            }
                            chatIndex = 0;
                            for (i=0; i<this.props.myChats.length; i++){
                                if (this.props.myChats[i].sellerId == item.item.sellerId && this.props.myChats[i].objectId == item.item.objectId){
                                    chatIndex = i;
                                    break;
                                }
                            }
                            return <ChatList 
                                        index={chatIndex}
                                        val={item.item.messages[item.item.messages.length-1]} 
                                        chatPage={(chatIndex2) => this.props.navigation.navigate("ChatPageScreen", {objectId: item.item.objectId, sellerId: item.item.sellerId, chatId: 1, buyerUid: this.props.userID, chatIndex: chatIndex2})}
                                    />
                            
                        }}
                        keyExtractor={(item, index) => index}
                        extraData = {this.state}
                    />
                </View >
                <View style={{flex: 0.5}}>
                    <View style={{alignItems: 'center'}}>
                        <Text >Miei interessi</Text>
                    </View> 
                    <FlatList
                        data = {this.props.chats}
                        renderItem = { (item) => {
                            if (item.item.messages[item.item.messages.length-1].text == "Send a message to update"){
                                return;
                            }
                            chatIndex = 0;
                            for (i=0; i<this.props.chats.length; i++){
                                if (  this.props.chats[i].objectId == item.item.objectId && this.props.chats[i].buyerId == item.item.buyerId){
                                    chatIndex = i;
                                    break;
                                }
                            }
                            return <ChatList 
                                        index={chatIndex}
                                        val={item.item.messages[item.item.messages.length-1]} 
                                        chatPage={(chatIndex2) => this.props.navigation.navigate("ChatPageSellingScreen", {objectId: item.item.objectId, sellerId: this.props.userID, chatId: 2, buyerUid: item.item.buyerId, chatIndex: chatIndex2})}
                                    />
                        }}
                        keyExtractor={(item, index) => index}
                        extraData = {this.state}
                    />
                </View>
            </View>
            
        )
    }
}

const mapStateToProps = (state) => { 
    return {
        myChats: state.chatsReducer.myChats,
        chats: state.chatsReducer.chats,
        userID: state.authenticationReducer.userID
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: '#BBDEFB'
    }
})


export default connect(mapStateToProps , null)(ChatsScreen);