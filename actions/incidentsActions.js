const fetchIncidents = (lat, long, radius) => {
  return dispatch => {
    dispatch({ type: 'LOADING_INCIDENTS' })
    fetch(`http://192.168.50.69:3000/incidents?latitude=${lat}&longitude=${long}&radius=${radius}`)
    .then(resp => resp.json())
    .then(json => dispatch({ type: 'SET_INCIDENTS', payload: json }))
  }
}

export {
  fetchIncidents
}