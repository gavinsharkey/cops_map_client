import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'

const HomeScreenButtons = ({handleSearchArea, navigation}) => {
  return (
    <View style={styles.buttonGroup}>
      <TouchableOpacity
        style={styles.button}
        onPress={handleSearchArea}
      >
        <Text style={styles.buttonText}>Search Area</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{...styles.button, borderRightWidth: 0}}
        onPress={() => navigation.navigate('IncidentForm')}
      >
        <Text style={styles.buttonText}>Add Indicent</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonGroup: {
    overflow: 'hidden',
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: "center",
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

export default HomeScreenButtons