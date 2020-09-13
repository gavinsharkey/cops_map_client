import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { connect } from 'react-redux'

const CaseScreen = props => {
  return (
    <View style={{flex: 1, padding: 15}}>
      <Text style={styles.descriptionTitle}>{props.caseData.title}</Text>
      <Text style={styles.description}>{props.caseData.description}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
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
    caseData: state.casesData.cases.find(caseData => caseData.id === ownProps.route.params.id)
  }
}

export default connect(mapStateToProps)(CaseScreen)
