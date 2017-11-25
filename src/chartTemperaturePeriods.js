import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import { StatusBar } from 'react-native'

import axios from 'axios'
import { API_URL } from 'react-native-dotenv'

export default class ChartTemperaturePeriods extends Component {
    constructor(props) {
        super(props)
    
        this.getPeriod = this.getPeriod.bind(this)

        this.state = { 
          temperatureList: [],
        }
    }

    static navigationOptions = {
        drawerLabel: 'Periods Chart'
    }

    componentDidMount() {
        this.getPeriod()
    }

    getPeriod() {
        // ler input ou pegar default (1d)
        this.periodSelected = {
            fromEpoch: (new Date()).setDate(new Date().getDate()-1),
            toEpoch: new Date().valueOf()
        }

        axios.get(`${API_URL}/measurements/period/1?from=${this.periodSelected.fromEpoch}&to=${this.periodSelected.toEpoch}`).then(res => {
            console.log('getPeriod', res.data)
        })
    }

    render() {
        return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" hidden={true}/>
            <Text onPress={this.getPeriod}>chart page</Text>
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
    }
  })