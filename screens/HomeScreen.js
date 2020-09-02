import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'
import HomeScreenButtons from '../components/HomeScreenButtons'
import HomeScreenMarker from '../components/HomeScreenMarker'

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingBottom: '20%',
    alignItems: 'center',
    justifyContent: "flex-end"
  }
})

const HomeScreen = ({ navigation }) => {
  const [region, setRegion] = useState({
    longitude: 0.0,
    latitude: 0.0,
    longitudeDelta: 0.1,
    latitudeDelta: 0.15
  })
  
  const [incidents, setIncidents] = useState([])

  const fetchIncidents = () => {
    fetch(`http://192.168.50.69:3000/incidents?latitude=${region.latitude}&longitude=${region.longitude}&radius=${region.longitudeDelta}`)
    .then(resp => resp.json())
    .then(json => setIncidents(json))
  }

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
      <MapView onRegionChange={setRegion} region={region} style={{...StyleSheet.absoluteFill}}>
        {incidents.map(incident => (
          <HomeScreenMarker navigation={navigation} key={incident.id} incident={incident} />
        ))}
      </MapView>
      <HomeScreenButtons fetchIncidents={fetchIncidents} />
    </View>
  )
}

export default HomeScreen