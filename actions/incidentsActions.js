import BACKEND_URL from '../constants/BACKEND_URL'

export const addIncident = incident => {
  return { type: 'ADD_INCIDENT', payload: incident }
}

export const fetchIncidents = (lat, long, radius) => {
  return dispatch => {
    dispatch({ type: 'LOADING_INCIDENTS' })
    fetch(`${BACKEND_URL}/incidents?latitude=${lat}&longitude=${long}&radius=${radius}`)
    .then(resp => resp.json())
    .then(json => dispatch({ type: 'SET_INCIDENTS', payload: json }))
  }
}