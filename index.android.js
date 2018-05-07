import React from 'react';
import { Text, View, AsyncStorage, Alert, AppRegistry} from 'react-native';
import {Navigator } from'react-native-deprecated-custom-components';
import { Container, Header, Content, Item, Input, Button, Form} from 'native-base';
import Login from './Login';
import Home from './Home';
import BarcodeCamera from './BarcodeCamera'
import CreateArticolo from "./CreateArticolo";

export default class obeloh extends React.Component {
  render(){
      return (
          <Navigator
              style={{ flex:1 }}
              initialRoute={{ name: 'Main', title:"Login", headerLeft:null }}
              configureScene = {this._configureScene}
              renderScene={ this.renderScene } />
      );
  }
    renderScene(route, navigator) {
            let value = AsyncStorage.getItem('user_id');
            if(route.name == 'Main' || value === "") {
                return <Login navigator={navigator}/>
            }
            if(route.name == 'Home' && value !== null) {
                return <Home navigator={navigator} />
            }

            if(route.name == 'CreateItem'){
                return <CreateArticolo navigator = {navigator} {...route.passProps}/>
            }

            if(route.name == 'BarcodeScanner'){
                return <BarcodeCamera navigator = {navigator} />
            }
    }
    _configureScene(route){
        switch (route.name){
            case 'Main':
            case 'Home':
                return NoBackSwipe;
                break;
                default:
                return Navigator.SceneConfigs.HorizontalSwipeJump;
        }
    };
}

const NoBackSwipe ={
    ...Navigator.SceneConfigs.HorizontalSwipeJump,
    gestures: {
        pop: {},
    },
};

AppRegistry.registerComponent("obeloh", ()=>obeloh)
