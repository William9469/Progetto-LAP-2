import firebase from 'react-native-firebase';
import { updateMyItems } from './my_items_actions';

export const updateItems = () => {
    return function(dispatch) {
        firebase.database().ref("/items/").on("value", (snapshot) => {
            items = snapshot.val();
            toMyItems = [];
            toItems = [];
            for (var item in items) {
                items[item].itemId = item;
                if (items[item].uid == firebase.auth().currentUser.uid){
                    toMyItems.push(items[item]);
                }
                else{
                    toItems.push(items[item])
                }
            }
            dispatch(updateMyItems({myItems: toMyItems, items: toItems}));
        })
    }

    

}