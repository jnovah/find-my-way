import { setVisibilityFilter, SHOW_ALL } from './setVisibilityFilter'

export const FETCH_ALL_TRIPS = 'FETCH_ALL_TRIPS'
export const FETCH_ALL_TRIPS_SUCCESS = 'FETCH_ALL_TRIPS_SUCCESS'
export const TOGGLE_TRIPS = 'TOGGLE_TRIPS'
export const TRIPS_DEPENDENT_CLASS = 'TRIPS_DEPENDENT_CLASS'

let fetchAllTrips = () => {
  return {
    type: FETCH_ALL_TRIPS
  }
}

let fetchAllTripsSuccess = allTrips => {
  return {
    type: FETCH_ALL_TRIPS_SUCCESS,
    allTrips,
    class: ''
  }
}

let getAllTrips = () => dispatch => {
  dispatch(fetchAllTrips())
  return fetch('/api/v1/trips.json', {
    credentials: "same-origin",
    headers: {"Content-Type": "application/json"}
  }) .then(response => response.json())
  .then(data => {
    dispatch(fetchAllTripsSuccess(data.trips))
    return data.trips
  })
  .then(trips => {
    dispatch(setVisibilityFilter(SHOW_ALL, trips))
  })
}

export {
  fetchAllTrips,
  fetchAllTripsSuccess,
  getAllTrips
}
