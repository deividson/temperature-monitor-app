import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import axios from 'axios'
import { API_URL } from 'react-native-dotenv'

export default class TemperatureMonitorApp extends React.Component {
  constructor(props) {
    super(props)

    this.getLastTemperature = this.getLastTemperature.bind(this)

    this.state = { 
      temperature: '',
      timestamp: '',
      message: ''
    }
  }

  getLastTemperature() {
    axios.get(`${API_URL}measurements/last/1`).then(res => {
      
      this.setState({...this.state,
        temperature: res.data.data ? res.data.data.temperature : '',
        timestamp: res.data.data ? res.data.data.timestamp : '',
        message: res.data.message
      })
      console.log('getLastTemperature', res.data)
    })
  }

  render() {
    return (
      <View style={styles.container}>
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
});