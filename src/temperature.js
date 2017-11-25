import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import { StatusBar } from 'react-native'

import axios from 'axios'
import { API_URL } from 'react-native-dotenv'

export default class Temperature extends Component {
    constructor(props) {
        super(props)
    
        this.getLastTemperature = this.getLastTemperature.bind(this)

        this.state = { 
          temperature: '',
          timestamp: '',
          formattedDate: '',
          message: ''
        }
    }

    componentDidMount() {
        this.getLastTemperature()        
    }

    static navigationOptions = {
        drawerLabel: 'Temperature Monitor'
    }

    getLastTemperature() {
        this.setData('-', 'loading...')

        axios.get(`${API_URL}/measurements/last/1`).then(res => {
          
            this.setData(
                res.data.data ? res.data.data.temperature : null,
                res.data.data ? res.data.data.timestamp : null,
                res.data.message
            )
            console.log('getLastTemperature', res.data)
        })
    }

    setData(temperature = '', timestamp = '', message = '') {
        this.setState({...this.state,
            temperature: isNaN(parseFloat(temperature)) ? temperature : `${temperature}${String.fromCharCode(176)}`,
            timestamp: timestamp,
            formattedDate: new Date(timestamp) instanceof Date ? `on ${new Date(timestamp).toLocaleString()}` : timestamp,
            message: message
          })
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" hidden={true}/>
            
                <View style={styles.containerTitle} >
                    <Text style={styles.bigText}
                        onPress={this.getLastTemperature}>
                        {this.state.temperature ? this.state.temperature : '-'}
                    </Text>
                </View>

                <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    }}>
                    <View style={styles.subtitleBlock}>
                        <Text style={styles.subtitleText}>{this.state.formattedDate}</Text>
                    </View>
                    <View style={styles.subtitleBlock} >
                        <Text>Message: {this.state.message}</Text>
                    </View>
                </View>
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
    containerTitle: {
        flex: 3,        
        alignItems: 'center',
        justifyContent: 'center',       
        // backgroundColor: 'powderblue',
    },
    subtitleBlock: {
        height: 50
    },
    bigText: {
        fontSize: 70,
        fontWeight: 'bold',
        textAlign: 'center',
    }, 
    subtitleText: {
        textAlign: 'center',        
    }
  })