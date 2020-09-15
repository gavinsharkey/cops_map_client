import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Marker } from 'react-native-maps'
import MapViewWithLocation from '../components/MapViewWithLocation'
import IncidentFormModal from '../components/IncidentFormModal'

const IncidentFormScreen = ({ navigation }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [region, setRegion] = useState({
    coordinate: {
      latitude: 0,
      longitude: 0
    }
  })

  const onCancel = () => {
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <MapViewWithLocation onMount={setRegion}>
        <Marker draggable onDragEnd={e => setRegion(e.nativeEvent)} coordinate={region.coordinate} />
      </MapViewWithLocation>
      <View style={styles.instructions}>
        <Text style={styles.instructionsText}>Select a location...</Text>
        <Text style={styles.instructionsSubText}>Drag the marker to the location of the incident</Text>
      </View>
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.button} onPress={onCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{...styles.button, borderRightWidth: 0}} onPress={() => setModalOpen(true)}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
      {modalOpen ? <IncidentFormModal closeModal={() => setModalOpen(false)} /> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  },
  instructions: {
    position: 'absolute',
    alignSelf: 'center',
    top: '8%',
    width: '90%',
    backgroundColor: '#243447',
    padding: 15,
    borderRadius: 15
  },
  instructionsText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 20
  },
  instructionsSubText: {
    color: '#fff',
    fontWeight: '400',
    fontSize: 20
  },
  buttonGroup: {
    overflow: 'hidden',
    borderRadius: 15,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: "center",
    bottom: '8%',
    alignSelf: 'center',
    width: '90%'
  },
  button: {
    borderRightWidth: 1,
    borderRightColor: '#fff',
    padding: 15,
    backgroundColor: '#243447',
    flex: 1
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 20
  }
})

export default IncidentFormScreen
