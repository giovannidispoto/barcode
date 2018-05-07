import React from 'react';
import { StyleSheet, Text,TextInput, AsyncStorage,Alert } from 'react-native';
import { Container, Header, Content, Item, Input, Form, Button,View, Title, Body, Left, Right, List, ListItem, Icon } from 'native-base';

export default class App extends React.Component {

  constructor(props){
    super(props)
  const partitaIVA =  AsyncStorage.getItem("partitaIVA");
  if(partitaIVA !== null)
      Alert.alert("Partita IVA set: "+ partitaIVA);


  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>Benvenuto nel sistema di gestione</Text>
        <Text style={styles.subtitle}>Inserisci la P. IVA per continuare </Text>
        <Item>
        <TextInput
        placeholder="P.IVA"
        style={{width:200, height:50, borderTopWidth: 0,borderBottomWidth:1,borderBottomColor: "skyblue"}}
        onChangeText = {(text)=> this.onChanged(text)}
      ></TextInput>
        </Item>
        <Button full Success style={{top:10, backgroundColor:'white', textColor:'skyblue'}} onPress={()=> this.save()}>
           <Text>Avanti</Text>
         </Button>
      </View>
    );
  }

  onChanged(text){
    this.setState({partitaIVA: text});
  }

  save(){
    try{
      AsyncStorage.setItem("partitaIVA", this.state.partitaIVA);
      console.log("Saved");

      this.props.navigator.push({
          name: 'Home',
      });
    }catch(error){
      console.log(error);
    }
  }

}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  titleText: {
   fontSize: 20,
   fontWeight: 'bold',
 },
 subtitle : {
   fontSize:15
 }
});
