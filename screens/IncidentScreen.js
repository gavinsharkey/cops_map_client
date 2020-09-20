import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, Button } from 'react-native'
import { connect } from 'react-redux'
import CasesContainer from '../components/CasesContainer'
import CaseFormScreen from './CaseFormScreen'
import BACKEND_URL from '../constants/BACKEND_URL'
import * as COLORS from '../constants/COLORS'

const IncidentScreen = ({ navigation, incident, firstCase, casesStatus }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openCaseFormModal = () => {
    navigation.setOptions({
      headerShown: false
    })
    setIsModalOpen(true)
  }

  const closeCaseFormModal = () => {
    navigation.setOptions({
      headerShown: true
    })
    setIsModalOpen(false)
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <Button 
            title="Add Case"
            color={COLORS.BlueGrey50}
            onPress={() => openCaseFormModal()}
          />
        )
      }
    })
  })

  const isLoadingCases = () => {
    return (casesStatus === 'pending') || (casesStatus === 'loading')
  }

  return (
    <>
      <View style={styles.container}>
          <View style={styles.imageContainer}>
            {isLoadingCases() ? null : <Image style={styles.image} source={{uri: `${BACKEND_URL}${firstCase.media_url}`}} /> }
            <View style={styles.imageTextContainer}>
              <Text style={styles.imageText}>{incident.description}</Text>
            </View>
          </View>
        <View style={styles.casesContainer}>
          <Text style={styles.casesTitle}>Cases</Text>
          <CasesContainer id={incident.id} />
        </View>
      </View>
      { isModalOpen
        ? <CaseFormScreen
            incidentId={incident.id}
            closeModal={closeCaseFormModal} />
        : null }
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#141d26',
  },
  imageContainer: {
    height: 300,
    backgroundColor: '#eee'
  },
  imageTextContainer: {
    position: 'relative',
    height: 50,
    bottom: 50,
    width: '100%',
    paddingLeft: 15,
    backgroundColor: `${COLORS.BlueGrey900}aa`,
    flexDirection: 'row',
    alignItems: 'center'
  },
  imageText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '500',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  casesContainer: {
    backgroundColor: '#fff',
    // borderTopStartRadius: 15,
    // borderTopEndRadius: 15,
    padding: 15,
    flex: 1
  },
  casesTitle: {
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
    incident: state.incidentsData.incidents.find(incident => incident.id == ownProps.route.params.id),
    firstCase: state.casesData.cases.find(caseData => caseData.incident_id === ownProps.route.params.id),
    casesStatus: state.casesData.casesStatus
  }
}

export default connect(mapStateToProps)(IncidentScreen)