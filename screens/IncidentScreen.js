import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import CasesContainer from '../components/CasesContainer'

const IncidentScreen = ({ navigation, incident }) => {
  useEffect(() => {
    navigation.setOptions({
      title: incident.title
    })
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.descriptionTitle}>Description:</Text>
        <Text style={styles.description}>{incident.description}</Text>
      </View>
      <View style={styles.casesContainer}>
        <Text style={styles.casesTitle}>Cases</Text>
        <CasesContainer id={incident.id} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#141d26',
  },
  textContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    margin: 15
  },
  casesContainer: {
    backgroundColor: '#fff',
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    paddingTop: 15,
    flex: 1
  }, 
  casesTitle: {
    textAlign:'center',
    fontSize: 20,
    marginBottom: 15
  },
  descriptionTitle: {
    fontWeight: '500',
    fontSize: 30,
    color: '#243447',
    marginBottom: 5
  },
  description: {
    fontWeight: '400',
    fontSize: 30,
    fontStyle: 'italic',
    color: '#243447'
  }
})

const mapStateToProps = (state, ownProps) => {
  return {
    incident: state.incidentsData.incidents.find(incident => incident.id == ownProps.route.params.id)
  }
}

export default connect(mapStateToProps)(IncidentScreen)