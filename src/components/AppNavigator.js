import React from 'react'
import { DrawerNavigator } from 'react-navigation'
import Temperature from './LastTemperature'
import ChartTemperaturePeriods from './PeriodTemperature'

const AppNavigator = DrawerNavigator({
  Chart: { screen: ChartTemperaturePeriods },
  Home: { screen: Temperature },
})

export default () => <AppNavigator />
