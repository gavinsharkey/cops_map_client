import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import BACKEND_URL from '../constants/BACKEND_URL'
import CasesListItem from './CasesListItem'

const CasesContainer = ({ id }) => {
  const [loading, setLoading] = useState(true)
  const [cases, setCases] = useState([])

  useEffect(() => {
    setLoading(true)
    fetch(`${BACKEND_URL}/incidents/${id}/cases`)
    .then(resp => resp.json())
    .then(json => {
      setCases(json)
      setLoading(false)
    })
  }, [id])

  return (
    <View style={styles.container}>
      <FlatList refreshing={loading} keyExtractor={item => String(item.id)} data={cases} renderItem={({ item }) => (
        <CasesListItem caseData={item} />
      )} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15
  }
})

export default CasesContainer

