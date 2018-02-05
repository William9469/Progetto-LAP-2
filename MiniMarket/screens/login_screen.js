import React from 'react';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';
import { logInThunk } from '../actions/login_actions';
import { isLoading } from '../actions/loading_actions';
import { connect } from 'react-redux';



class LoginScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }

    onLoginPress = () => {
        this.props.fIsLoading({isLoading: true})
        this.props.logInThunk({email: this.state.email, password: this.state.password})
    }




    render(){
        return(
            <View style={styles.containerStyle}>
                <FormLabel labelStyle={styles.labelStyle}>Email</FormLabel>
                <FormInput 
                    onChangeText={(text) => this.setState({email: text})}
                    inputStyle={styles.inputStyle}
                    containerStyle={{width: '50%'}}
                    placeholder={"Insert email"}
                />
                <FormLabel labelStyle={styles.labelStyle}>Password</FormLabel>
                <FormInput 
                    onChangeText={(text) => this.setState({password: text})}
                    inputStyle={styles.inputStyle}
                    containerStyle={{width: '50%'}}
                    placeholder={"Insert password"}
                    secureTextEntry={true}
                />
                <Button 
                    title="LOGIN" 
                    backgroundColor={"#107896"}
                    containerViewStyle = {styles.buttonStyle}
                    onPress={()=> this.onLoginPress()}
                    loading={this.props.isLoadingS}
                    disabled={this.props.isLoadingS}
                />  
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logInThunk: (emailAndPassword) => {
            dispatch(logInThunk(emailAndPassword))
        },
        fIsLoading: (value) => {
            dispatch(isLoading(value));
        }
    }
}

const mapStateToProps = (state) => {
    return ({ isLoadingS: state.authenticationReducer.isLoading });
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

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