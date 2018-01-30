import { TOGGLE_TRIP, FETCH_TRIP, FETCH_TRIP_SUCCESS, HAS_LEGS, COMPLETED_TRIP } from '../actions/tripShow'

let initialState = {
  currentTrip: null,
  isFetching: false,
  title: "",
  description: "",
  origin: {},
  final: {},
  stops: [],
  directions: [],
  mapBounds: {},
  hasLegs: false,
  completed: false,
  planning: false,
  en_route: false,
  completed: false,
  legs: [],
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
        currentTrip: action.trip.id,
        title: action.trip.title,
        description: action.trip.description,
        hasLegs: action.trip.has_legs,
        completed: action.trip.completed,
        en_route: action.trip.en_route,
        planning: action.trip.planning,
        mapBounds: action.trip.bounds,
        origin: Object.assign({}, state.start, action.trip.start),
        final: Object.assign({}, state.final, action.trip.end),
        stops: action.trip.stops,
        legs: action.trip.legs
      })
    default:
      return state
  }
}

export default trip
