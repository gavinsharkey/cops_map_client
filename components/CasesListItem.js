import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import BACKEND_URL from '../constants/BACKEND_URL'

const CasesListItem = props => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: `${BACKEND_URL}${props.caseData.media_url}` }} />
      <Text>Case {props.caseData.id}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderColor: '#141d26',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 15,
    overflow: 'hidden'
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    
  }
})

export default CasesListItem
