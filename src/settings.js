import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import { StatusBar } from 'react-native'

export default class Settings extends Component {
    constructor(props) {
        super(props)
    
        this.getLastTemperature = this.getLastTemperature.bind(this)

        this.state = { 
          temperature: '',
          timestamp: '',
          message: ''
        }
    }

    static navigationOptions = {
        drawerLabel: 'Settings'
    }

    render() {
        return (
            <View>
                <StatusBar hidden={true}/>
                <Text>settings page</Text>
            </View>
        )
    }
}