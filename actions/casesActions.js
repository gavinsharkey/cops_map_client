import BACKEND_URL from '../constants/BACKEND_URL'

export const fetchCases = id => {
  return dispatch => {
    dispatch({type: 'LOADING_CASES'})
    fetch(`${BACKEND_URL}/incidents/${id}/cases`)
    .then(resp => resp.json())
    .then(json => {
      dispatch({type: 'SET_CASES', payload: json})
    })
  }
}