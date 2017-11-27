const FETCH_ALL_TRIPS = 'FETCH_ALL_TRIPS'
const FETCH_ALL_TRIPS_SUCCESS = 'FETCH_ALL_TRIPS_SUCCESS'
const TOGGLE_TRIPS = 'TOGGLE_TRIPS'
const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'
const FETCH_TRIPS = 'FETCH_ITEMS'

const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_IN_PLANNING: 'SHOW_IN_PLANNING'
}

let fetchAllTrips = () => {
  return {
    type: FETCH_ALL_TRIPS
  }
}

let fetchAllTripsSuccess = allTrips => {
  return {
    type: FETCH_ALL_TRIPS_SUCCESS,
    allTrips
  }
}

let getAllTrips = () => dispatch => {
  dispatch(fetchAllTrips())
  return fetch('/api/v1/trips', {
    credentials: "same-origin",
    headers: {"Content-Type": "application/json"}
  }) .then(response => response.json())
  .then(data => {
    dispatch(fetchAllTripsSuccess(data.trips))
  })
}
