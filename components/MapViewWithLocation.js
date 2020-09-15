import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import MapView from 'react-native-maps'
import * as Location from 'expo-location'

class MapViewWithLocation extends Component {
  constructor() {
    super()
    this.map = React.createRef()
  }

  componentDidMount() {
    Location.requestPermissionsAsync()
    .then(resp => {
      if (resp.granted) {
        Location.getLastKnownPositionAsync()
        .then(resp => {
          this.map.current.setCamera({ center: { longitude: resp.coords.longitude, latitude: resp.coords.latitude }, altitude: 50000, zoom: 12 })
          this.props.onMount && this.props.onMount({ coordinate: { longitude: resp.coords.longitude, latitude: resp.coords.latitude }})
        })
      }
    })
  }

  render() {
    return (
      <MapView loadingEnabled ref={this.map} onRegionChange={this.props.onRegionChange} style={{...StyleSheet.absoluteFillObject}}>
        {this.props.children}
      </MapView>
    )
  }
}

export default MapViewWithLocation
