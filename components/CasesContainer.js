import React, { useState, useEffect } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { fetchCases } from '../actions/casesActions'
import CasesListItem from './CasesListItem'

const CasesContainer = ({ id, cases, casesStatus, fetchCases }) => {
  useEffect(() => {
    fetchCases(id)
  }, [id])

  const isRefreshing = () => casesStatus === 'loading' ? true : false

  return (
    <View style={styles.container}>
      <FlatList refreshing={isRefreshing()} keyExtractor={item => String(item.id)} data={cases} renderItem={({ item }) => (
        <CasesListItem caseData={item} />
      )} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

const mapStateToProps = state => ({
  cases: state.casesData.cases,
  casesStatus: state.casesData.casesStatus
})

export default connect(mapStateToProps, { fetchCases })(CasesContainer)

