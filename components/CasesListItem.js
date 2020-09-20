import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import BACKEND_URL from '../constants/BACKEND_URL'

const CasesListItem = ({caseData}) => {
  const navigation = useNavigation()

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Case', {
      id: caseData.id
    })}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: `${BACKEND_URL}${caseData.media_url}` }} />
        </View>
        <View style={styles.textContainer}>
          <Text ellipsizeMode='tail' numberOfLines={1} style={styles.text}>{caseData.description}</Text>
        </View>
        <Text>{'>'}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 15,
  },
  textContainer: {
    width: '60%',
  },
  imageContainer: {
    shadowOffset: { height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowColor: '#666'
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 15,
  },
  text: {
    fontWeight: '700',
    fontSize: 20
  }
})

export default CasesListItem
