import { FETCH_CURRENT_USER, FETCH_CURRENT_USER_SUCCESS } from '../actions/getCurrentUser'

let initialState = {
  isFetching: false,
  item: { firstName: null, picture: null}
}

const currentUser = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CURRENT_USER:
      return Object.assign({}, state, { isFetching: true })
    case FETCH_CURRENT_USER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        item: action.currentUser
      })
    default:
      return state
  }
}

export default currentUser
