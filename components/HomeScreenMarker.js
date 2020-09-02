import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Marker, Callout } from 'react-native-maps'

const HomeScreenMarker = ({ incident, navigation }) => {
  return (
    <Marker pinColor="#c51f5d" coordinate={{latitude: incident.latitude, longitude: incident.longitude}}>
      <Callout tooltip onPress={() => navigation.navigate('Incident', { id: incident.id })}>
        <View style={styles.tooltip}>
          <Text style={styles.tooltipText}>{incident.title}</Text>
          <Text style={{...styles.tooltipText, marginLeft: 10}}>{'>'}</Text>
        </View>
      </Callout>
    </Marker>
  )
}

const styles = StyleSheet.create({
  tooltip: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,
    backgroundColor: '#243447'
  },
  tooltipText: {
    color: '#fff',
    fontWeight: '600'
  }
})

export default HomeScreenMarker