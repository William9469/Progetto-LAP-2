import React from 'react';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import loginScreen from '../screens/login_screen';
import registrationScreen from '../screens/registration_screen';

const TabNavLoginRegistration = new TabNavigator(
    {
        Login: {
            screen: loginScreen,
        },
        Registration: {
            screen: registrationScreen,
        }
    },
    {
        tabBarOptions: {
            activeTintColor: 'black',
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

export default TabNavLoginRegistration;