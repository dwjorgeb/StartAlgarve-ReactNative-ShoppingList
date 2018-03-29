import React, {Component} from 'react';
import {
    StyleProvider,
    Container,
    List,
    ListItem,
    Text,
    Left,
    Body,
    Right,
    Icon,
    View
} from 'native-base'
import {Font, AppLoading} from 'expo';
import getTheme from './native-base-theme/components';

export default class Favourites extends Component {

    static navigationOptions = {
        title: 'Favourites',
    };

    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    async componentWillMount() {
        await Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        });

        this.setState({loading: false});
    }

    _renderItem = (item) => {

        return (
            <ListItem icon key={item.id} >
                <Left>
                    <Icon name={"md-checkmark-circle-outline"} />
                </Left>
                <Body>
                <Text>{item.title}</Text>
                </Body>
                <Right />
            </ListItem>
        )
    };

    render() {

        const params = this.props.navigation.state.params;
        const favourites = params ? params.favourites : [];

        if (this.state.loading) {
            return <AppLoading/>;
        }

        return (
            <StyleProvider style={getTheme()}>
                <Container>
                    <View style={{flex: 1}}>
                        <View style={{flex: 1, padding: 10}}>
                            <List
                                dataArray={favourites}
                                renderRow={this._renderItem}
                            />
                        </View>
                    </View>
                </Container>
            </StyleProvider>
        );
    }
}