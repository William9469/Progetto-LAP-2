import React from 'react';
import { StackNavigator } from 'react-navigation';
import TabNav from './tab_navigator';
import addItemScreen from '../screens/add_item_screen';
import ItemScreen from '../screens/item_screen';
import GeneralItemScreen from '../screens/general_item_screen';
import ChatPage from '../screens/chat_page';
import ChatPageSelling from '../screens/chat_page_selling';


const StackNav = StackNavigator({
    Home: {
        screen: TabNav,
        navigationOptions: {
            header: null
        }
    },
    AddItem: {
        screen: addItemScreen
    },
    ItemScreen: {
        screen: ItemScreen
    },
    GeneralItemScreen: {
        screen: GeneralItemScreen
    },
    ChatPageScreen: {
        screen: ChatPage
    },
    ChatPageSellingScreen: {
        screen: ChatPageSelling
    }
})

export default StackNav;