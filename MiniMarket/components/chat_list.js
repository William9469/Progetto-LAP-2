import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    Image,
    TouchableOpacity
 } from 'react-native';

export default class ChatList extends React.Component {
  render() {
    return (
        <TouchableOpacity onPress={ () => this.props.chatPage(this.props.index)}>
            <View style={styles.note}>
                <Text style={styles.noteText}>{this.props.val.text}</Text>
            </View>
        </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
    note: {
        position: 'relative',
        padding: 20,
        paddingRight: 100,
        borderBottomWidth: 2,
        borderBottomColor: '#ededed',
        width: "100%"
    },
    noteText: {
        paddingLeft: 20,
        borderLeftWidth: 10,
        borderLeftColor: '#E91E63',
    },
});