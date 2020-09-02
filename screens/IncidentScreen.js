import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default class IncidentScreen extends Component {
  render() {
    return (
      <View>
        <Text>incident id: {this.props.route.params.id}</Text>
      </View>
    )
  }
}