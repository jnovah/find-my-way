import { FETCH_ALL_TRIPS, FETCH_ALL_TRIPS_SUCCESS } from '../actions/getAllTrips'
import { SHOW_ALL, SHOW_COMPLETED, SHOW_IN_PLANNING, SET_VISIBILITY_FILTER } from '../actions/setVisibilityFilter'


let initialState = {
  visibilityFilter: 'All Trips',
  isFetching: false,
  trips: [],
  filteredTrips: [],
  class: 'hidden'
}

const trips = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_TRIPS:
      return Object.assign({}, state, {isFetching: true})
    case FETCH_ALL_TRIPS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        trips: action.allTrips,
        class: action.class
      })
    case SET_VISIBILITY_FILTER:
      return state
    case SHOW_ALL:
      return Object.assign({}, state, { filteredTrips: action.trips })
    case SHOW_IN_PLANNING:
      return Object.assign({}, state, {
        visibilityFilter: 'Trips In Planning',
        filteredTrips: action.trips
      })
    case SHOW_COMPLETED:
      return Object.assign({}, state, {
        visibilityFilter: 'Completed Trips',
        filteredTrips: action.trips
      })
    default:
      return state
  }
}

export default trips
