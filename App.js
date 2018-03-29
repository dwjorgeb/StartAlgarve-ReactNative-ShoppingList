import React, {Component} from 'react';
import {StackNavigator} from 'react-navigation';

// Import Screens

import Home from './Home'
import Favourites from './Favourites'


const Shopping = StackNavigator({
        Home: {screen: Home},
        Favourites: {screen: Favourites},
    },
    {
        initialRouteName: 'Home',
    }
);

export default class App extends Component {
    render() {
        return <Shopping />
    }
}