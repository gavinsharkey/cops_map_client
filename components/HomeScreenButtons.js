import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'

const HomeScreenButtons = ({fetchIncidents}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={fetchIncidents}>
        <Text style={styles.buttonText}>Search This Area</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Add Indicent</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 15
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 15
  }
})

export default HomeScreenButtons