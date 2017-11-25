import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  StatusBar,
} from 'react-native'

import { API_URL } from 'react-native-dotenv'
import axios from 'axios'

const STATUS = {
  EMPTY: 'EMPTY',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
}

export default class Temperature extends Component {
  static navigationOptions = {
    drawerLabel: 'Temperature Monitor'
  }

  state = {
    sensorId: null,
    status: STATUS.EMPTY,
    data: null,
  }

  getData = () => {
    const { sensorId } = this.state

    axios.get(`${API_URL}/measurements/last/${sensorId}`)
      .then(res => {
        const { data } = res.data
        if (!data) {
          throw new Error(`No data for sensor ${sensorId}`)
        }
        return data
      })
      .then(data => this.setState({ status: STATUS.SUCCESS, data }))
      .catch((err) => {
        console.log('Error while getting data', err)
        this.setState({ status: STATUS.ERROR })
      })
  }

  handleChangeText = (sensorId) => {
    this.setState({ sensorId, status: STATUS.EMPTY })
  }

  handlePressButton = () => {
    if (!this.state.sensorId) {
      return
    }
    this.getData()
  }

  renderResult() {
    const { temperature, timestamp, sensorId } = this.state.data

    return (
      <View style={styles.containerTitle} >
        <Text>Last temperature for sensor {sensorId}</Text>
        <Text
          style={styles.bigText}
          onPress={this.getData}
        >
          {temperature}
        </Text>
        <Text style={styles.subtitleText}>{timestamp}</Text>
      </View>
    )
  }

  renderPlaceholder() {
    return (
      <View style={styles.containerInput}>
        <Text>Fill the sensor ID to get the last temperature</Text>
      </View>
    )
  }

  renderError() {
    return (
      <View style={styles.containerInput}>
        <Text>Couldn't get data for sensor {this.state.sensorId}</Text>
      </View>
    )
  }

  render() {
    const { status } = this.state

    let content
    if (status === STATUS.EMPTY) {
      content = this.renderPlaceholder()
    } else if (status === STATUS.SUCCESS) {
      content = this.renderResult()
    } else if (status === STATUS.ERROR) {
      content = this.renderError()
    }

    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" hidden={true}/>
        <View style={styles.containerInput}>
          <TextInput
            placeholder={'Enter the sensor id'}
            style={{width: 200, height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={this.handleChangeText}
            value={this.state.sensorId}
          />
          <Button
            style={{width: 200}}
            onPress={this.handlePressButton}
            title="Get last temperature"
          />
        </View>
        {content}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  containerInput: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  containerTitle: {
    flex: 2,
    // alignItems: 'center',
    // justifyContent: 'center',
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
