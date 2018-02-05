import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { signOutThunk } from '../actions/login_actions';

class profileScreen extends React.Component {
    render(){
        return (
            <View style={styles.containerStyle}>
                <Image style={{height: 150, width: 150, alignItems: 'center'}} source={{uri: this.props.avatarSource}} />
                <Text>Profile Screen</Text>
                <Text>{this.props.userEmail}</Text>
                <Text>{this.props.username}</Text>
                <Button 
                    title={"Log Out"}
                    onPress={() => this.props.signOutThunk()}
                    containerViewStyle={{height: 0, width: "25%"}}
                    backgroundColor={"#107896"} 
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userEmail: state.authenticationReducer.userEmail,
        username: state.authenticationReducer.username,
        avatarSource: state.authenticationReducer.avatarSource
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOutThunk: () => {
            dispatch(signOutThunk())
        }
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#BBDEFB'
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(profileScreen);