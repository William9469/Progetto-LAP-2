import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    Image,
    TouchableOpacity
 } from 'react-native';

export default class ItemList extends React.Component {
  render() {
    return (
        <TouchableOpacity onPress={ () => this.props.itemPage()}>
            <View style={styles.note}>
                <Text style={styles.noteText}>{this.props.val.title}</Text>
                <Text style={styles.noteText}>{this.props.val.note}</Text>
                <Image style={styles.image} source={{uri : this.props.val.image}}/>
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
    image: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2980b9',
        padding: 10,
        top: 20,
        bottom: 10,
        right: 10,
        height: 35,
        width: 35,
    },

});