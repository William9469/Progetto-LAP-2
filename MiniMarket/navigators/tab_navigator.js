import React from 'react';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import profileScreen from '../screens/profile_screen';
import homeScreen from '../screens/home_screen';
import myItemsScreen from '../screens/my_items_screen';
import chatScreen from '../screens/chat_screen';

const TabNav = new TabNavigator(
    {
        Home: {
            screen: homeScreen,
        },
        Profile: {
            screen: profileScreen,
        },
        MyItems: {
            screen: myItemsScreen,
        },
        MyChats: {
            screen: chatScreen,
        }
    },
    {
        tabBarOptions: {
            style: {
                backgroundColor: '#1E88E5',
            },
            labelStyle: {
                color: 'white',
                fontSize: 14
            },
            activeBackgroundColor: "#0D47A1",
        },
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        swipeEnabled: false,
        animationEnabled: true,
    }
)

export default TabNav;