export const TOGGLE_TRIP = 'TOGGLE_TRIP'
export const FETCH_TRIP = 'FETCH_TRIP'
export const FETCH_TRIP_SUCCESS = 'FETCH_TRIP_SUCCESS'

let toggleTrip = (id) => {
  type: TOGGLE_TRIP,
  index: id
}

let fetchTrip = () => {
  type: FETCH_TRIP,
}

let fetchTripSuccess = completeTripObject => {
  type: FETCH_TRIP_SUCCESS,
  completeTripObject
}

let fetchTrip = (id) => {

}
