export default (state = {
  incidents: [],
  incidentsStatus: "pending"
}, action) => {
  switch (action.type) {
    case 'LOADING_INCIDENTS':
      return {
        ...state,
        incidents: [...state.incidents],
        incidentsStatus: 'loading'
      }
    case 'SET_INCIDENTS':
      return {
        ...state,
        incidents: action.payload,
        incidentsStatus: 'ok'
      }
    case 'ERROR_FETCHING_INCIDENTS':
      return {
        ...state,
        incidentsStatus: 'error'
      }
    default:
      return state
  }
}