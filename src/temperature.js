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
          message: ''
        }
    }

    static navigationOptions = {
        drawerLabel: 'Temperature Monitor'
    }

    getLastTemperature() {
        // this.props.navigation.navigate('DrawerOpen');
        
        axios.get(`${API_URL}measurements/last/1`).then(res => {
          
          this.setState({...this.state,
            temperature: res.data.data ? res.data.data.temperature : '',
            timestamp: res.data.data ? res.data.data.timestamp : '',
            message: res.data.message
          })
          console.log('getLastTemperature', res.data)
        })
    }

    goToChart() {
        this.props.navigation.navigate('Chart')
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
            <StatusBar barStyle="dark-content" hidden={true}/>
          
            <Text style={styles.title}>Temperature Monitor App</Text>
            <Text>Temperature: {this.state.temperature}</Text>
            <Text>Timestamp: {this.state.timestamp}</Text>
            <Text>Message: {this.state.message}</Text>
            <Button
              style={styles.buttonAction}
              onPress={this.getLastTemperature}
              title="atualizar"
              color="#841584"
              accessibilityLabel="refresh temperature monitor data"
            />
            <Button
              style={styles.buttonAction}
              onPress={() => navigate('Chart')}
              title="graficos"
              color="#841584"
              accessibilityLabel="refresh temperature monitor data"
            />
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
      marginTop: '60px',
    }
  })