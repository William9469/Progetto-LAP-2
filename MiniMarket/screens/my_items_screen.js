import React from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux';
import ItemList from '../components/item_list';


class myItemsScreen extends React.Component {

    render(){
        let myItems = this.props.myItems.map((val, key) => {
            return ({val: val, key: key});
        });
        return (
            <View style={styles.containerStyle}>
                <Button 
                    backgroundColor={"#107896"}
                    title="Aggiungi oggetto"
                    onPress={() => this.props.navigation.navigate("AddItem")}
                />
                <FlatList
                    data = {myItems}
                    renderItem = { (item) => <ItemList 
                                                val={item.item.val} 
                                                itemPage={() => this.props.navigation.navigate("ItemScreen" , {image: item.item.val.image, title: item.item.val.title, note: item.item.val.note, pickUpLocation: item.item.val.pickUpLocation, itemId: item.item.val.itemId, uid: item.item.val.uid, imageRef: item.item.val.imageRef})}
                                             />}
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        myItems: state.myItemsReducer.myItems
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: '#BBDEFB'
    },
})




export default connect(mapStateToProps, null)(myItemsScreen);