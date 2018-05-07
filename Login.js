import React from 'react';
import { StyleSheet, Text, View, Alert, AsyncStorage, AppRegistry} from 'react-native';
import { Container, Header, Content, Item, Input, Form, Button } from 'native-base';
import UserInteractor from './UserInteractor';

export default class Login extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            username : "",
            password : ""
        }
    }

    auth(){
        let credentials = {cmd : "App_Login",  username : this.state.username, password : this.state.password,};
        console.log(credentials);
        var formBody = [];
        for (var property in credentials) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(credentials[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        console.log(formBody);

        fetch("http://test.blusrl.com/parser.php",{
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody,
        }).then((response) => response.text())
            .then((responseData) => {
                console.log(responseData);
               if(responseData === "KO")
                   UserInteractor.act("Error", "Username o Password errate");
               else AsyncStorage.setItem("user_id", responseData).then(() => {
                   this.props.navigator.push({
                       name: 'Home'
                   })
               })

            })
            .catch((error) => console.error(error));
    }


    render(){
        return (
            <Container>
                <Header/>
                <Content>
                    <Form>
                        <Item>
                            <Input placeholder="Username" onChangeText = {(text) => this.setState({username : text})} />
                        </Item>
                        <Item>
                            <Input placeholder="Password" onChangeText = {(text) => this.setState({password : text})}/>
                        </Item>
                        <Button full primary onPress={this.auth.bind(this)}>
                            <Text>Login</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        );
    }
}

AppRegistry.registerComponent("Login", ()=>Login);