import React from 'react';
import { StyleSheet, Text, View, Alert, AsyncStorage, AppRegistry, Image, TouchableHighlight } from 'react-native';
import { Container, Header, Content, ListItem, Input, Form, Button, GroupItem, Label,Picker,CheckBox, List, Right, Radio, Item,Left } from 'native-base';
import xml2js from 'react-native-xml2js';
import ImagePicker from 'react-native-image-picker';
import ImageLoad from 'react-native-image-placeholder';

export default class CreateArticolo extends React.Component {

    constructor(props) {
        super(props);
        Alert.alert("props", props.barcode_value);
        this.state = {
            barcode_value: props.barcode_value != null ? props.barcode_value : "",
            selectedMisura: "key0",
            selectedIva: "",
            barcode: "",
            marca: "",
            descrizione_lunga: "",
            foto: {uri : "https://maxcdn.icons8.com/Share/icon/dotty/Editing//select_all1600.png"},
            stockChecked: false,
            userPhoto : {uri : "https://maxcdn.icons8.com/Share/icon/dotty/Editing//select_all1600.png"},
            display : {uri : "https://maxcdn.icons8.com/Share/icon/dotty/Editing//select_all1600.png"}
        };
    }


    pickImage(){
        var options = {
            title: 'Select Avatar',
            customButtons: [
                {name: 'fb', title: 'Choose Photo from Facebook'},
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    userPhoto: source,
                    display : {uri : 'data:image/jpeg;base64,' + response.data}
                });
            }

        });
    }


    researchArticle(){
        Alert.alert("Procedo Ricerca", this.state.barcode_value);

        let credentials = {cmd : "App_cercaEAN",  chiave: this.state.barcode_value};
        console.log(credentials);
        var formBody = [];
        for (var property in credentials) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(credentials[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        fetch("http://test.blusrl.com/parser.php", {
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then((response) => response.text())
            .then((response) => {
            var parseString = xml2js.parseString;
            var result_obj;

            parseString(response,{explicitArray : false}, function (err, result) {
                if(err !== null)
                    console.error(err);
                else {
                    Alert.alert("test", JSON.stringify(result.articolo.marca));
                    result_obj = {marca : result.articolo.marca, descrizione_lunga : result.articolo.descrizione, foto: { uri : result.articolo.foto != "" ? result.articolo.foto : this.state.foto.uri}}
                }
            })
                this.setState(result_obj);
        });

    }

   checkboxState(){
        this.setState({stockChecked: !this.state.stockChecked});
    }

    readCodiceBarre(){
        this.props.navigator.replace({
            name: "BarcodeScanner",
        });
    }

    onValueChange2(value: string) {
        this.setState({
            selectedMisura: value
        });
    }


    render(){
        return(
            <Container>
                <Header>
                    <Text>Inserisci Articolo</Text>
                </Header>
                <Content>
                    <Form>
                        <List>
                        <Button full success onPress={() => this.readCodiceBarre()} >
                                <Text>Scansiona codice a barre</Text>
                            </Button>
                        <ListItem>
                          <Input keyboardType={'numeric'} placeholder={"Codice a barre"} name={"codice"} value = {this.state.barcode_value != "" ? this.state.barcode_value : ""} onChangeText={(text) => this.setState({barcode_value : text})}/>
                            <Button  onPress = {this.researchArticle.bind(this)}>
                                <Text>Ricerca Codice</Text>
                            </Button>
                        </ListItem>
                        <ListItem>
                        <Input keyboardType={'numeric'} placeholder={"Codice Prodotto"} name={"codice_prodotto"}/>
                        </ListItem>
                        <ListItem>
                        <Input placeholder={"Codice EN-13"} name={"codice_en_13"} value = {this.state.barcode_value != "" ? this.state.barcode_value : ""} />
                        </ListItem>
                        <ListItem>
                        <Input placeholder={"Marca"} name={"marca"} value = {this.state.marca} onChangeText={(value) => this.setState({marca : value})}/>
                        </ListItem>
                        <ListItem>
                        <Input placeholder={"Descrizione Breve"} name={"descrizione_breve"} value = {this.state.descrizione_breve}/>
                        </ListItem>

                        <ListItem stackedLabel last>
                            <Input placeholder={"Descrizione Lunga"} value={this.state.descrizione_lunga} onChangeText={(value) => this.setState({descrizione_lunga : value})}/>
                        </ListItem>
                        <Item>
                            <Picker
                                style={{width:"100%"}}
                                mode="dropdown"
                                iosHeader="Pippo"
                                selectedValue={this.state.selectedMisura}
                                onValueChange={(loc) => this.setState({selectedMisura : loc})}
                            >
                                <Picker.Item label="Prezzo Sciolto" value="key0" />
                            </Picker>

                        </Item>

                        <ListItem>
                            <Label>Giacenza</Label>
                            <Input keyboardType={'numeric'}/>
                        </ListItem>

                        <ListItem>
                            <CheckBox checked = {this.state.stockChecked} onPress={() => this.checkboxState()}/>
                            <Text> Vendita in Stock</Text>
                        </ListItem>

                        <ListItem>
                            <Picker
                                mode="dropdown"
                                style={{width:"100%"}}
                                iosHeader="IVA"
                                selectedValue={this.state.selectedIva}
                                onValueChange={(val) => this.setState({selectedIva: val})}
                            >
                                <Picker.Item label="22 %" value="22" />
                                <Picker.Item label="10 %" value="10" />
                                <Picker.Item label="Esenzione IVA art. 74" value="ES74" />
                            </Picker>
                        </ListItem>
                        </List>

                                <Text>Scegli un'immagine dalla galleria o quella consigliata</Text>
                            <Item>
                                <Left>
                                     <Image source={this.state.foto} style={{width:300, height : 300}}/>
                                </Left>
                                <Right>
                                    <Radio selected={true}/>
                                </Right>
                            </Item>
                                <Item itemDivider/>
                        <Item>
                            <Left>
                                <TouchableHighlight onPress={()=>this.pickImage()}>
                                <Image source={this.state.display} style={{width:300, height : 300}} />
                                </TouchableHighlight>
                            </Left>
                            <Right>
                                <Radio selected={true}/>
                            </Right>
                        </Item>
                                <Right>
                                    <Radio selected={false}/>
                                </Right>

                    </Form>

                </Content>
            </Container>
        )
    }
}