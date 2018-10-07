const initialState = {
  user: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        ...state,
        user: action.data,
        keys: action.key
      }

    case 'SIGN_UP':
      return {
        ...state,
        user: action.data,
        keys: action.key
      }

    case 'SIGN_OUT':
      return {
        ...state,
        user: '',
        keys: ''
      }

    case 'LOADING_START':
      return {
        ...state,
        loading: true
      }

    case 'LOADING_END':
      return {
        ...state,
        loading: false
      }

    case 'ERROR_CLEAR':
      return {
        ...state,
        error: ''
      }

    case 'ADD_EVENT':
      return {
        ...state,
        user: action.data
      }

    case 'ERROR':
      return {
        ...state,
        error: action.error
      }

    case 'ADD_RECO':
      return {
        ...state,
        reco : action.data
      }

    default:
      return state
  }
}