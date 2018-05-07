import React from 'react';
import {StyleSheet, AppRegistry, View, Text, Alert} from "react-native";
import { Container, Header, Content, Item, Input, Form, Button } from 'native-base';
import Camera from 'react-native-camera';

export default class BarcodeCamera extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            torchMode: 'off',
            cameraType: 'back',
        };

    }


    barcodeReceived(data, bounds) {
        this.props.navigator.replace({
            name: 'CreateItem',
            passProps : {barcode_value : data.data}
        })
    }

    getBarcodeState(){
        return this.state.barcode;
    }


    render() {
        return (
            <View style = {styles.container} >
            <Camera
                ref={(cam) => {
                    this.camera = cam;
                }}
                style={styles.preview}
                aspect={Camera.constants.Aspect.fill}
                onBarCodeRead = {(data,bounds) =>this.barcodeReceived(data,bounds)}>
            </Camera>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 40
    }
});

AppRegistry.registerComponent("BarcodeCamera", ()=>BarcodeCamera);