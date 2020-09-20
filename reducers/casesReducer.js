export default (state = {
  cases: [],
  casesStatus: 'pending'
}, action) => {
  switch (action.type) {
    case 'LOADING_CASES':
      return {
        ...state, 
        casesStatus: 'loading'
      }
    case 'SET_CASES':
      return {
        ...state,
        cases: action.payload,
        casesStatus: 'ok'
      }
    case 'ADD_CASE':
      return {
        ...state,
        cases: [...state.cases, action.payload]
      }
    case 'ERROR_FETCHING_CASES':
      return {
        ...state,
        casesStatus: 'error'
      }
    default:
      return state
  }
}