import React, {Component} from 'react';
import {ListView, Modal} from 'react-native';
import {
    StyleProvider,
    Container,
    Card,
    CardItem,
    List,
    ListItem,
    Text,
    Left,
    Button,
    Body,
    Right,
    Icon,
    Form,
    Fab,
    Input,
    Item,
    View
} from 'native-base'
import {Font, AppLoading} from 'expo';
import getTheme from './native-base-theme/components';

export default class Home extends Component {

    static navigationOptions = ({navigation}) => {

        const params = navigation.state.params || {};

        return {
            title: 'Shopping List',
            headerLeft: <Button
                onPress={() => {/* YOUR CODE HERE*/
                }}
                transparent
            >
                <Icon style={{color: "white"}} name='menu'/>
            </Button>,
            headerRight:
                <Button
                    transparent
                    onPress={params.goToFavourites}
                >
                    <Icon style={{color: "white"}} name='heart'/>
                </Button>,
            headerStyle: {
                backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            shopping_list: [{id: 1, title: "Insert your items here"}],
            favourites: {},
            loading: true,
            fab_active: false,
            modal: false
        };

        this._defaultState();
    }

    async componentWillMount() {
        await Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        });

        this.setState({loading: false});

        this.props.navigation.setParams({goToFavourites: this._goToFavourites});
    }

    _defaultState = () => {
        this.state.shopping_list.forEach((item) => {
            this.state.favourites[item.id] = false
        });
    };

    _goToFavourites = () => {

        let favourites = [];

        this.state.shopping_list.forEach((item) => {
            if (this.state.favourites[item.id]) {
                favourites.push(item);
            }
        });

        this.props.navigation.navigate('Favourites', {favourites: favourites});
    };

    addToList = () => {

        // Test for empty text
        let txt = this.state.tmpText.trim();


        if (!!txt) {

            let objects = [...this.state.shopping_list];

            // Test for duplicates
            // YOUR CODE HERE

            // Add to the list
            // YOUR CODE HERE
        }
    };

    _deleteItem = (secId, rowId, rowMap) => {
        rowMap[`${secId}${rowId}`].props.closeRow();
        let shopping_list = [...this.state.shopping_list];
        // YOUR CODE HERE
    };

    _favourite = (item) => {
        let favourites = Object.assign({}, this.state.favourites);
        favourites[item.id] = !favourites[item.id];

        let objects = [...this.state.shopping_list];

        // Don't change
        for (let i = 0; i < objects.length; i++) {
            if (objects[i].id === item.id) {
                objects[i] = Object.assign({}, objects[i]);
            }
        }

        this.setState({favourites: favourites, shopping_list: objects});
    };

    _toggleModal = () => {
        this.setState({modal: !this.state.modal})
    };

    _renderItem = (item) => {

        const color = this.state.favourites[item.id] ? "red" : "black",
            icon = this.state.favourites[item.id] ? 'md-heart' : "md-heart-outline";

        return (
            <ListItem icon key={item.id} style={{paddingLeft: 10, paddingVertical: 5}}>
                <Left>
                    <Icon
                        name={"md-checkmark-circle-outline"}/>
                </Left>
                <Body>
                <Text>{item.title}</Text>
                </Body>
                <Right>
                    <Icon
                        onPress={() => {
                            this._favourite(item)
                        }}
                        style={{color: color, fontSize: 30}}
                        name={icon}/>
                </Right>
            </ListItem>
        )
    };

    render() {

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        if (this.state.loading) {
            return <AppLoading/>;
        }

        return (
            <StyleProvider style={getTheme()}>
                <Container>
                    <View style={{flex: 1, paddingHorizontal: 5, paddingVertical: 10}}>
                        <List
                            style={{backgroundColor: '#fff'}}
                            dataSource={ds.cloneWithRows(this.state.shopping_list)}
                            renderRow={this._renderItem}
                            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                                <Button full danger
                                        onPress={_ => this._deleteItem(secId, rowId, rowMap)}>
                                    <Icon active name="trash"/>
                                </Button>}
                            rightOpenValue={-75}
                        />
                        <Fab
                            active={this.state.fab_active}
                            direction="up"
                            containerStyle={{}}
                            style={{backgroundColor: '#5067FF'}}
                            position="bottomRight"
                            onPress={() => this.setState({fab_active: !this.state.fab_active})}>
                            <Icon name="add"/>
                            <Button
                                style={{backgroundColor: 'red'}}
                                onPress={this._toggleModal}
                            >
                                <Icon name="md-create"/>
                            </Button>
                        </Fab>
                        <Modal
                            animationType="slide"
                            transparent={false}
                            visible={this.state.modal}
                            onRequestClose={() => {
                            }}
                            style={{marginTop: 22}}
                        >
                            <Card>
                                <CardItem header>
                                    <Text style={{textAlign: "center"}}>Add Item to Shopping List</Text>
                                </CardItem>
                                <CardItem cardBody>
                                    <View style={{flex: 1}}>
                                        <Form>
                                            <Item floatingLabel style={{marginTop: 5}}>
                                                <Input
                                                    placeholder={"Insert Text..."}
                                                    onChangeText={(text) => {
                                                        this.setState({tmpText: text})
                                                    }}
                                                    onSubmitEditing={() => {
                                                        this.addToList();
                                                        this._toggleModal();
                                                        this.setState({fab_active: !this.state.fab_active});
                                                    }}
                                                />
                                                <Icon name={'md-create'}/>
                                            </Item>
                                        </Form>
                                    </View>
                                </CardItem>
                                <CardItem footer>
                                    <View style={{flex: 1}}>
                                        <Button
                                            iconRight
                                            block
                                            title={"Save"}
                                            onPress={() => {
                                                this.addToList();
                                                this._toggleModal();
                                                this.setState({fab_active: !this.state.fab_active});
                                            }}
                                        >
                                            <Text>Save</Text>
                                            <Icon name={'md-checkmark'}/>
                                        </Button>
                                    </View>
                                </CardItem>
                            </Card>
                        </Modal>
                    </View>
                </Container>
            </StyleProvider>
        );
    }
}