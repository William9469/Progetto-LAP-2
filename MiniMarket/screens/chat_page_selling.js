import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { connect } from 'react-redux';
import { sendMessage } from '../actions/chat_actions';

class ChatPageSelling extends React.Component {



  onSend(messages = []) {
    this.props.sendMessage({sellerId: this.props.navigation.state.params.sellerId, objectId: this.props.navigation.state.params.objectId, message: messages[0], buyerUid: this.props.navigation.state.params.buyerUid});
  }



  render() {
      return (
        <GiftedChat
          messages={this.props.chats}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: this.props.navigation.state.params.chatId,
            name: this.props.username
        }}
      />
    ) 
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (message) => {
      dispatch(sendMessage(message));
    }
  }
}

const mapStateToProps = (state, props) => {
  return {
    chats: state.chatsReducer.chats[props.navigation.state.params.chatIndex].messages,
    username: state.authenticationReducer.username
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatPageSelling);