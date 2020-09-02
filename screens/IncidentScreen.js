import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

class IncidentScreen extends Component {
  componentDidMount() {
    this.props.navigation.setOptions({
      title: this.props.incident.title
    })
  }

  render() {
    return (
      <View style={styles.container}>
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141d26',
  }
})

const mapStateToProps = (state, ownProps) => {
  return {
    incident: state.incidentsData.incidents.find(incident => incident.id == ownProps.route.params.id)
  }
}

export default connect(mapStateToProps)(IncidentScreen)