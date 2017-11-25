import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import { StatusBar } from 'react-native'

import axios from 'axios'
import { API_URL } from 'react-native-dotenv'

export default class ChartTemperaturePeriods extends Component {
    constructor(props) {
        super(props)
    

        this.state = { 
          temperatureList: [],
        }
    }

    static navigationOptions = {
        drawerLabel: 'Periods Chart'
    }

    render() {
        return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" hidden={true}/>
            <Text>chart page</Text>
          </View>            
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontWeight: 'bold',
    },
    buttonAction: {
      marginTop: '32px',
    }
  })