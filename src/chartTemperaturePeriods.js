import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import { StatusBar } from 'react-native'
import { VictoryAxis, VictoryTheme, VictoryLine, VictoryStack, VictoryChart, VictoryBar } from "victory-native";

import axios from 'axios'
import { API_URL } from 'react-native-dotenv'

export default class ChartTemperaturePeriods extends Component {
    static navigationOptions = {
        drawerLabel: 'Periods Chart'
    }

    state = { 
        temperatureList: [{x:1,y:1}, {x:2,y:3}],
    }

    componentDidMount() {
        this.getPeriod()
    }

    getPeriod = () => {
        // ler input ou pegar default (1d)
        this.periodSelected = {
            // fromEpoch: (new Date()).setDate(new Date().getDate()-1),
            fromEpoch: (new Date()).setHours(new Date().getHours()-1),
            toEpoch: new Date().valueOf()
        }

        axios.get(`${API_URL}/measurements/period/1?from=${this.periodSelected.fromEpoch}&to=${this.periodSelected.toEpoch}`).then(res => {
            // console.log('getPeriod', res.data)

            this.setState({
                temperatureList: res.data.data.map((t) => ({x: t.timestamp, y: t.temperature}))
            })
            console.log('getPeriod list', this.state.temperatureList)
            
        })
    }

    render() {
        return (
            <View style={styles.container}>
 
                <VictoryChart theme={VictoryTheme.material}>
                    <VictoryLine style={{
                        data: { stroke: "#c43a31" },
                        parent: { border: "1px solid #ccc"}
                        }}
                        data={this.state.temperatureList}/>

                </VictoryChart>

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
