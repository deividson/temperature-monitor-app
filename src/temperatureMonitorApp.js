import React from 'react';
import { AppRegistry } from 'react-native'
import { DrawerNavigator } from 'react-navigation'
import Temperature from './temperature'
import ChartTemperaturePeriods from './chartTemperaturePeriods'
import Settings from './settings'

const AppNavigator = DrawerNavigator({
  Chart: { screen: ChartTemperaturePeriods },
  Home: { screen: Temperature },  
  Settings: { screen: Settings },
})

export default class TemperatureMonitorApp extends React.Component {

  render() {
    return (
      <AppNavigator/>
    )
  }
}

