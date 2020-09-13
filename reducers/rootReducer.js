import { combineReducers } from 'redux'
import incidentsData from '../reducers/incidentsReducer'
import casesData from '../reducers/casesReducer'

export default combineReducers({
  incidentsData,
  casesData
})