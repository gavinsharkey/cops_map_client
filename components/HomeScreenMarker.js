import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Marker, Callout } from 'react-native-maps'

const HomeScreenMarker = ({ incident, navigation }) => {
  return (
    <Marker coordinate={{latitude: incident.latitude, longitude: incident.longitude}}>
      <Callout style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => navigation.navigate('Incident', { id: incident.id })}>
        <Text>{incident.title}</Text>
        <Text style={{marginLeft: 15, opacity: 0.5}}>{'>'}</Text>
      </Callout>
    </Marker>
  )
}

export default HomeScreenMarker