import React from 'react';
import { View, Modal } from 'react-native';
import MapView from 'react-native-maps';
import { closeMapModal } from '../actions/modal_actions';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';


class MyItemMapModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            positionCoords: {
                latitude: 0,
                longitude: 0
            },
            markerPositionCoords: {
                latitude: 0,
                longitude: 0
            }
        }
    }


    componentDidMount() {
        this.setState({positionCoords: this.props.positionCoords, markerPositionCoords: this.props.markerPositionCoords})
    }


    render() {
        return (
            <Modal
                transparent
                animationType={'slide'}
                visible={this.props.mapModalIsOpen}
                onRequestClose={() => this.props.closeMapModal()}
            >
                <MapView 
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                    }}
                    region={{
                        latitude: this.state.positionCoords.latitude,
                        longitude: this.state.positionCoords.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                >
                    <MapView.Marker draggable
                        title="Incontro"
                        description="Selezionare il luogo d'incontro"
                        coordinate={this.state.markerPositionCoords}
                        onDragEnd={(e) => {
                            this.props.setPosition({latitude: e.nativeEvent.coordinate.latitude, longitude: e.nativeEvent.coordinate.longitude});
                            this.setState({ markerPositionCoords: e.nativeEvent.coordinate })}
                        }
                    />
 
                </MapView>
                <Button 
                    textStyle={{color: "black"}}
                    title="Fatto"
                    backgroundColor="transparent"
                    onPress={()=>this.props.closeMapModal()}
                />
            </Modal>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        mapModalIsOpen : state.modalsReducer.mapModalIsOpen
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        closeMapModal: () => {
            dispatch(closeMapModal())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyItemMapModal);