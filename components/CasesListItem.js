import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import BACKEND_URL from '../constants/BACKEND_URL'

const CasesListItem = props => {
  return (
    <View style={styles.container}>
      <Image style={{width: 30, height: 30, flex: 1}} source={{ uri: `${BACKEND_URL}${props.caseData.media_url}` }} />
      <Text>Case {props.caseData.id}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderColor: '#141d26',
    borderWidth: 1,
    paddingVertical: 30,
    flexDirection: 'row'
  }
})

export default CasesListItem
