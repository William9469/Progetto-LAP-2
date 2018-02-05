import React from 'react';
import { FormLabel, FormInput, Button, Text } from 'react-native-elements';
import { View, StyleSheet, Image, Alert } from 'react-native';
import MapView from 'react-native-maps';
import  MapModal  from '../modals/map_modal';
import { connect } from 'react-redux';
import { openMapModal } from '../actions/modal_actions';
import ImagePicker from 'react-native-image-picker';
import { addItem } from '../actions/my_items_actions';
import { isLoading } from '../actions/loading_actions';

var options = {
    title: 'Select image',
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
};


class AddItemScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            notes: '',
            imageSource: '',
            positionCoords: {
                latitude: 0,
                longitude: 0
            }
        }
    }

    generateImage = () => {
        if(this.state.imageSource == ''){
            return <Text>Item image</Text>
        }
        else {
            return  <Image style={{height: 150, width: 150, alignItems: 'center'}} source={{uri: ""+this.state.imageSource}} /> 
        }
    }

    setPositionCoord = (coord) => {
        this.setState({positionCoords: {latitude: coord.latitude, longitude:coord.longitude}})
    }



    render(){
        let imageSource = this.generateImage();
        return(
            <View style={{flex: 1}}>
                <MapModal setPosition={(coord) => this.setPositionCoord(coord)}/>
                <View style={styles.containerStyle}>
                    {imageSource}
                    <FormLabel labelStyle={styles.labelStyle}>Title</FormLabel>
                    <FormInput 
                        onChangeText={(text) => this.setState({title: text})}
                        inputStyle={styles.inputStyle}
                        value={this.state.title}
                        containerStyle={{width: '50%'}}
                        placeholder={"Insert title"}
                    />
                    <FormLabel labelStyle={styles.labelStyle}>Notes </FormLabel>
                    <FormInput 
                        onChangeText={(text) => this.setState({notes: text})}
                        inputStyle={styles.inputStyle}
                        value={this.state.notes}
                        containerStyle={{width: '50%'}}
                        placeholder={"Insert notes"}
                    />
                    <Button 
                        title="Image" 
                        disabled={this.props.isLoadingS}
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
                                imageSource: source.uri
                              });
                            }
                          })}
                    />  
                    <Button 
                        title="Choose pick up location" 
                        backgroundColor={"#107896"}
                        containerViewStyle = {styles.buttonStyle}
                        onPress= {() => {
                            this.props.openMapModal()
                        }}
                        disabled={this.props.isLoadingS}
                    />  
                    <Button 
                        title="Upload item" 
                        backgroundColor={"#107896"}
                        containerViewStyle = {styles.buttonStyle}
                        onPress= {() => {
                            if(this.state.title == '') {
                                Alert.alert("Errore", "Inserire titolo");
                            } else if (this.state.imageSource == '') {
                                Alert.alert("Errore", "Inserire immagine");
                            } else if (this.state.positionCoords.latitude == 0 && this.state.positionCoords.longitude == 0) {
                                Alert.alert("Errore", "Inserire luogo d'incontro");
                            } else {
                                this.props.isLoading({isLoading: true});
                                this.props.addItem({title: this.state.title, note: this.state.notes, image: "nothing for now", pickUpLocation: this.state.positionCoords, image: this.state.imageSource});
                                this.setState({title: "", notes: "", imageSource: ""});
                            }

                        }}
                        loading={this.props.isLoadingS}
                        disabled={this.props.isLoadingS}
                    />  
                </View>
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        openMapModal: () => {
            dispatch(openMapModal())
        },
        addItem: (item) => {
            dispatch(addItem(item))
        },
        isLoading: (loading) => {
            dispatch(isLoading(loading));
        }
    }
}

const mapStateToProps = (state) => {
    return ({ isLoadingS: state.authenticationReducer.isLoading });
}

export default connect(mapStateToProps, mapDispatchToProps)(AddItemScreen);


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