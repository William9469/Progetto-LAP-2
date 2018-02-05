import React from 'react';
import { FormLabel, FormInput, Button, Text } from 'react-native-elements';
import { View, StyleSheet, Image, Alert } from 'react-native';
import { connect } from 'react-redux';
import { signUpThunk } from '../actions/login_actions';
import { isLoading } from '../actions/loading_actions';
import ImagePicker from 'react-native-image-picker';



var options = {
    title: 'Select Avatar',
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
};




class RegistrationScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            username: '',
            avatarSource: ''
        }
    }
    

    onSignUpPress = () => {
        if(this.state.password == this.state.confirmPassword){
            this.props.fIsLoading({isLoading: true});
            this.props.signUpThunk({email: this.state.email, password: this.state.password, confirmPassword: this.state.confirmPassword, username: this.state.username, avatarSource: this.state.avatarSource.uri})
        }
        else{
            Alert.alert("Error", "passwords must be the same")
        }

    }

    generateImage = () => {
        if(this.state.avatarSource == ''){
            return <Text>Here will be displayed your avatar</Text>
        }
        else {
            return  <Image style={{height: 150, width: 150, alignItems: 'center'}} source={{uri: ""+this.state.avatarSource.uri}} /> 
        }
    }


    render(){
        let imageSource = this.generateImage();
        return(
            <View style={styles.containerStyle}>
                {imageSource}
                <FormLabel labelStyle={styles.labelStyle}>Email</FormLabel>
                <FormInput 
                    onChangeText={(text) => this.setState({email: text})}
                    inputStyle={styles.inputStyle}
                    containerStyle={{width: '50%'}}
                    placeholder={"Insert email"}
                />
                <FormLabel labelStyle={styles.labelStyle}>Username</FormLabel>
                <FormInput 
                    onChangeText={(text) => this.setState({username: text})}
                    inputStyle={styles.inputStyle}
                    containerStyle={{width: '50%'}}
                    placeholder={"Insert username"}
                />
                <FormLabel labelStyle={styles.labelStyle}>Password</FormLabel>
                <FormInput 
                    onChangeText={(text) => this.setState({password: text})}
                    inputStyle={styles.inputStyle}
                    containerStyle={{width: '50%'}}
                    placeholder={"Insert password"}
                    secureTextEntry={true}
                />
                <FormInput 
                    onChangeText={(text) => this.setState({confirmPassword: text})}
                    inputStyle={styles.inputStyle}
                    containerStyle={{width: '50%'}}
                    placeholder={"Confirm password"}
                    secureTextEntry={true}
                />
                <Button 
                    title="SIGN UP" 
                    backgroundColor={"#107896"}
                    containerViewStyle = {styles.buttonStyle}
                    onPress={() => this.onSignUpPress()}
                    loading={this.props.isLoadingS}
                    disabled={this.props.isLoadingS}
                />  
                <Button 
                    title="SELEZIONA IMMAGINE" 
                    backgroundColor={"#107896"}
                    containerViewStyle = {styles.buttonStyle}
                    onPress={() => ImagePicker.showImagePicker(options, (response) => {
                        console.log('Response = ', response);
                      
                        if (response.didCancel) {
                          console.log('User cancelled image picker');
                        }
                        else if (response.error) {
                          console.log('ImagePicker Error: ', response.error);
                        }
                        else {
                          let source = { uri: response.uri };
                      
                          this.setState({
                            avatarSource: source
                          });
                        }
                      })}
                    loading={this.props.isLoadingS}
                    disabled={this.props.isLoadingS}
                />  
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUpThunk: (singUpData) => {
            dispatch(signUpThunk(singUpData))
        },
        fIsLoading: (value) => {
            dispatch(isLoading(value));
        }
    }
}

const mapStateToProps = (state) => {
    return ({ isLoadingS: state.authenticationReducer.isLoading });
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationScreen);


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