import { TOGGLE_TRIP, FETCH_TRIP, FETCH_TRIP_SUCCESS, HAS_LEGS, COMPLETED_TRIP } from '../actions/tripShow'

let initialState = {
  currentTrip: null,
  isFetching: false,
  trip: {},
  directions: [],
  hasLegs: false,
  completed: false,
  class: ''
}

const trip = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_TRIP:
      return Object.assign({}, state, { currentTrip: action.id })
    case FETCH_TRIP:
      return Object.assign({}, state, { isFetching: true })
    case HAS_LEGS:
      return Object.assign({}, state, {
        directions: action.directions,
        hasLegs: true
      })
    case COMPLETED_TRIP:
      return Object.assign({}, state, {
        completed: true,
        class: 'hidden'
      })
    case FETCH_TRIP_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        trip: action.trip
      })
    default:
      return state
  }
}

export default trip
