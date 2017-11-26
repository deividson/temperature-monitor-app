import React, { Component } from 'react'

import {
  StyleSheet,
  View,
} from 'react-native'

import {
  VictoryScatter,
  VictoryTheme,
  VictoryLine,
  VictoryChart,
} from 'victory-native'

import axios from 'axios'
import { API_URL } from 'react-native-dotenv'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default class ChartTemperaturePeriods extends Component {
  static navigationOptions = {
    drawerLabel: 'Periods Chart',
  }

  state = {
    temperatureList: [{ x: 1, y: 1 }, { x: 2, y: 3 }],
  }

  componentDidMount() {
    this.getPeriod()
  }

  getPeriod = () => {
    this.periodSelected = {
      // fromEpoch: (new Date()).setDate(new Date().getDate()-1),
      fromEpoch: (new Date()).setHours(new Date().getHours() - 1),
      toEpoch: new Date().valueOf(),
    }

    axios.get(`${API_URL}/measurements/period/1?from=${this.periodSelected.fromEpoch}&to=${this.periodSelected.toEpoch}`).then((res) => {
      this.setState({
        temperatureList: res.data.data.map(t => ({ x: t.timestamp, y: t.temperature })),
      })
      // console.log('getPeriod list', this.state.temperatureList)
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <VictoryChart
          theme={VictoryTheme.grayscale}
          domain={{ y: [0, 40] }}
        >
          <VictoryLine
            style={{ data: { stroke: 'rgba(75, 192, 192, 1)' } }}
            data={this.state.temperatureList}
          />
          <VictoryScatter
            style={{ data: { fill: 'rgba(75, 192, 192, 1)' } }}
            data={this.state.temperatureList}
            size={2}
          />
        </VictoryChart>
      </View>
    )
  }
}
