import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import MapView from 'react-native-maps'
import * as Location from 'expo-location'

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingBottom: '20%',
    alignItems: 'center',
    justifyContent: "flex-end"
  },
  searchBar: {
    width: '90%',
    backgroundColor: '#f2f2f7',
    padding: 15,
    borderRadius: 15,

  }
})

const HomeScreen = () => {
  const [region, setRegion] = useState({
    longitude: 0.0,
    latitude: 0.0,
    longitudeDelta: 0.1,
    latitudeDelta: 0.15
  })

  useEffect(() => {
    Location.requestPermissionsAsync()
    .then(resp => {
      if (resp.granted) {
        Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Lowest})
        .then(resp => {
          setRegion(prevRegion => ({ ...prevRegion, longitude: resp.coords.longitude, latitude: resp.coords.latitude }))
        })
      }
    })
  }, [])

  return (
    <View style={styles.screen}>
      <MapView onRegionChange={setRegion} region={region} style={{...StyleSheet.absoluteFill}} />
      <View style={styles.searchBar}>
        <Text>Bar</Text>
      </View>
    </View>
  )
}

export default HomeScreen