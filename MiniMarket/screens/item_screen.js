import React from 'react';
import { FormLabel, Button, FormInput } from 'react-native-elements';
import { View, StyleSheet, Image } from 'react-native';
import MapView from 'react-native-maps';
import  MyItemMapModal  from '../modals/my_item_map_modal';
import { connect } from 'react-redux';
import { openMapModal } from '../actions/modal_actions';
import { modifyMyItem, removeMyItem } from '../actions/my_items_actions';
import ImagePicker from 'react-native-image-picker';

const NUMBER_OF_MODIFIABLE_PARAMS = 4;

var options = {
    title: 'Select image',
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
};



class ItemScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            newTitle: '',
            newNote: '',
            newImage: '',
            newPickUpLocation: {
                latitude: 0,
                longitude: 0
            }
        }
    }

    replaceImage = () => {
        if (this.state.newImage == '') {
            return <Image style={{height: 150, width: 150, alignItems: 'center'}} source={{uri: ""+this.props.navigation.state.params.image}} />
        }else {
            return <Image style={{height: 150, width: 150, alignItems: 'center'}} source={{uri: ""+this.state.newImage}} />
        }
    }

    setPositionCoord = (coord) => {
        this.setState({newPickUpLocation: coord})
    }


    render(){
        let image = this.replaceImage();
        return(
            <View style={{flex: 1}}>
                <MyItemMapModal setPosition={(coord) => this.setPositionCoord(coord)} positionCoords={this.props.navigation.state.params.pickUpLocation} markerPositionCoords={this.props.navigation.state.params.pickUpLocation}/>
                <View style={styles.containerStyle}>
                     {image}
                    <FormLabel labelStyle={styles.labelStyle}>{this.props.navigation.state.params.title}</FormLabel>
                    <FormInput 
                        onChangeText={(text) => this.setState({newTitle: text})}
                        inputStyle={styles.inputStyle}
                        value={this.state.newTitle}
                        containerStyle={{width: '50%'}}
                        placeholder={"Nuovo titolo"}
                    />
                    <FormLabel labelStyle={styles.labelStyle}>{this.props.navigation.state.params.note}</FormLabel>
                    <FormInput 
                        onChangeText={(text) => this.setState({newNote: text})}
                        inputStyle={styles.inputStyle}
                        value={this.state.newNote}
                        containerStyle={{width: '50%'}}
                        placeholder={"Nuova nota"}
                    />
                    <Button 
                        title="Cambia immagine" 
                        backgroundColor={"#107896"}
                        containerViewStyle = {styles.buttonStyle}
                        onPress= {() => ImagePicker.showImagePicker(options, (response) => {
                            console.log('Response = ', response);
                          
                            if (response.didCancel) {
                              console.log('User cancelled image picker');
                            }
                            else if (response.error) {
                              console.log('ImagePicker Error: ', response.error);
                            }
                            else {
                              let source = { uri: response.uri };
                          
                              // You can also display the image using data:
                              // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                          
                              this.setState({
                                image: source.uri
                              });
                            }
                          })}
                    />  
                    <Button 
                        title="Cambia luogo d'incontro" 
                        backgroundColor={"#107896"}
                        containerViewStyle = {styles.buttonStyle}
                        onPress= {() => {
                            this.props.openMapModal();
                        }}
                    />  
                    <Button 
                        title="Applica modifiche" 
                        backgroundColor={"#107896"}
                        containerViewStyle = {styles.buttonStyle}
                        onPress= {() => {
                            counter = 0;
                            modifiedItem = {
                                title: this.state.newTitle,
                                note: this.state.newNote,
                                image: this.state.newImage,
                                pickUpLocation: this.state.newPickUpLocation,
                                uid: this.props.navigation.state.params.uid,
                                itemId: this.props.navigation.state.params.itemId,
                                imageRef: this.props.navigation.state.params.imageRef
                            }
                            if (this.state.newTitle == '') {
                                modifiedItem.title = this.props.navigation.state.params.title;
                                counter++;
                            }
                            if (this.state.newNote == '') {
                                modifiedItem.note = this.props.navigation.state.params.note;
                                counter++;
                            }
                            if (this.state.newImage == '') {
                                modifiedItem.image = this.props.navigation.state.params.image;
                                counter++;
                            }
                            if (this.state.newPickUpLocation.latitude == 0 && this.state.newPickUpLocation.longitude == 0) {
                                modifiedItem.pickUpLocation = this.props.navigation.state.params.pickUpLocation;
                                counter++;
                            }
                            if (counter < NUMBER_OF_MODIFIABLE_PARAMS) {
                                this.props.modifyMyItem(modifiedItem);
                                this.props.navigation.goBack();
                            }
                        }}
                    />  
                    <Button 
                        title="Elimina oggetto" 
                        backgroundColor={"#107896"}
                        containerViewStyle = {styles.buttonStyle}
                        onPress= {() => {
                            this.props.removeMyItem({itemId: this.props.navigation.state.params.itemId, imageRef: this.props.navigation.state.params.imageRef });
                            this.props.navigation.goBack();
                        }}
                    />  
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
        }
    }
}

export default connect(null, mapDispatchToProps)(ItemScreen);



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
