import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import store from './store';
import WrapperScreen from './screens/wrapper_screen';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <WrapperScreen />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
