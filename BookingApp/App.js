/**
* Sample React Native App
* https://github.com/facebook/react-native
*
* @format
* @flow strict-local
*/

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import BottomBar from './Prefab/BottomBar';
import { Provider} from 'react-redux'
import {store} from './AppRedux/ProfileStore'


navigator.geolocation = require('@react-native-community/geolocation');

export default class App extends React.Component  {
  
  constructor(props){
    super(props);
    this.state={
      getStarted:true
    };
  }
  
  
  
  render(){
    return (
      <Provider store={store}>
      <BottomBar/>
      </Provider>
      );
    }
    
    OnDone(){
      this.setState({getStarted:false});
    }
  };
  
  const styles = StyleSheet.create({
    
  });
  
  