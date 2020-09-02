import React, { Component} from 'react'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { fetchIncidents } from '../actions/incidentsActions'
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

class HomeScreen extends Component {
  constructor() {
    super()
    this.map = React.createRef()
    this.state = {
      region: {
        longitude: 0.0,
        latitude: 0.0,
        longitudeDelta: 0.1,
        latitudeDelta: 0.15,
      }
    }
  }

  componentDidMount() {
    Location.requestPermissionsAsync()
    .then(resp => {
      if (resp.granted) {
        Location.getLastKnownPositionAsync()
        .then(resp => {
          this.map.current.setCamera({ center: { longitude: resp.coords.longitude, latitude: resp.coords.latitude }, altitude: 50000, zoom: 12 })
        })
      }
    })
  }

  handleRegionChange = region => {
    this.setState({
      region
    })
  }

  handleSearchArea = () => {
    const { latitude, longitude, latitudeDelta } = this.state.region
    if (this.props.incidentsStatus !== 'loading') {
      this.props.fetchIncidents(latitude, longitude, latitudeDelta)
    }
  }

  render() {
    const { navigation, incidents } = this.props
    return (
      <View style={styles.screen}>
        <MapView loadingEnabled ref={this.map} onRegionChange={this.handleRegionChange} style={{...StyleSheet.absoluteFill}}>
          {incidents.map(incident => (
            <HomeScreenMarker navigation={navigation} key={incident.id} incident={incident} />
          ))}
        </MapView>
        <HomeScreenButtons handleSearchArea={this.handleSearchArea} />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    incidents: state.incidentsData.incidents,
    incidentsStatus: state.incidentsData.incidentsStatus
  }
}

export default connect(mapStateToProps, { fetchIncidents })(HomeScreen)