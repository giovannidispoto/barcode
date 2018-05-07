import React from 'react';
import {Text, AsyncStorage, TouchableHighlight, AppRegistry} from 'react-native';
import { Container, Header, Content, Item, Input, Form, Button,View, Title, Body, Left, Right, List, ListItem, Icon } from 'native-base';


export default class Home extends React.Component{

    logout(){
            this.props.navigator.push({
                name: 'Main',
            })
        );
    }

    createItem(){
        this.props.navigator.push({
            name: "CreateItem",
        })
    }

    render(){
        return(
                <Container>
                    <Header>
                        <Left/>
                        <Body>
                        <Title>Admin Panel</Title>
                        </Body>
                        <Right />
                    </Header>
                     <Content>
                         <List>
                             <ListItem onPress = {() => this.createItem()}>
                                 <Left>
                                 <Text>Inserisci Prodotto</Text>
                                 </Left>
                                 <Body/>
                                 <Right>
                                     <Icon name="arrow-forward" />
                                 </Right>
                             </ListItem>
                             <ListItem>
                                 <Left>
                                    <Text>Visualizza Prodotti</Text>
                                 </Left>
                                 <Body/>
                                 <Right>
                                     <Icon name="arrow-forward" />
                                 </Right>
                             </ListItem>
                             <ListItem onPress = {() => this.logout()}>
                                 <Left>
                                     <Text>Logout</Text>
                                 </Left>
                                 <Body/>
                                 <Right>
                                     <Icon name="arrow-forward" />
                                 </Right>
                             </ListItem>
                         </List>
                    </Content>

                 </Container>

        );
    }
}

AppRegistry.registerComponent("Home", ()=>Home);
