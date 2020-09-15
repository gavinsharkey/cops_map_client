import React, { Component} from 'react'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { fetchIncidents } from '../actions/incidentsActions'
import MapViewWithLocation from '../components/MapViewWithLocation'
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
        <MapViewWithLocation onRegionChange={this.handleRegionChange}>
          {incidents.map(incident => (
            <HomeScreenMarker navigation={navigation} key={incident.id} incident={incident} />
          ))}
        </MapViewWithLocation>
        <HomeScreenButtons navigation={navigation} handleSearchArea={this.handleSearchArea} />
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