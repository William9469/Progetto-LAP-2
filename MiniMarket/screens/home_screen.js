import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { updateItems } from '../actions/items_actions';
import { updateMyChats, updateChats } from '../actions/chat_actions';
import ItemList from '../components/item_list';


class homeScreen extends React.Component {
    componentDidMount() {
        this.props.updateItems();
        this.props.updateMyChats();
        this.props.updateChats();
      }


      render(){
        let items = this.props.items.map((val, key) => {
            return ({val: val, key: key});
        });
        return (
            <View style={styles.containerStyle}>
                <FlatList
                    data = {items}
                    renderItem = { (item) => <ItemList 
                                                val={item.item.val} 
                                                itemPage={() => this.props.navigation.navigate("GeneralItemScreen" , {image: item.item.val.image, title: item.item.val.title, note: item.item.val.note, pickUpLocation: item.item.val.pickUpLocation, itemId: item.item.val.itemId, uid: item.item.val.uid})}
                                             />}
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => {    
    return {
        items: state.myItemsReducer.items,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateItems: () => {
            dispatch(updateItems());
        },
        updateMyChats: () => {
            dispatch(updateMyChats());
        },
        updateChats: () => {
            dispatch(updateChats());
        }
    }
}
const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: '#BBDEFB'
    }
})

export default connect(mapStateToProps , mapDispatchToProps)(homeScreen);