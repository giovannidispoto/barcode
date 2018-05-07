import {Alert} from 'react-native';
import React from 'react';

export default class UserInteractor{

   static act(title, body){
        Alert.alert(title, body);
    }
}