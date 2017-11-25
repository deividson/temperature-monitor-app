import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import { StatusBar } from 'react-native'

export default class Settings extends Component {
    static navigationOptions = {
        drawerLabel: 'Settings'
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={true}/>
                <Text>settings page</Text>
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