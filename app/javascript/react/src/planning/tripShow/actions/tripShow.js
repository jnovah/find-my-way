export const TOGGLE_TRIP = 'TOGGLE_TRIP'
export const FETCH_TRIP = 'FETCH_TRIP'
export const FETCH_TRIP_SUCCESS = 'FETCH_TRIP_SUCCESS'
export const HAS_LEGS = 'NO_LEGS'
export const COMPLETED_TRIP = 'COMPLETED_TRIP'

let toggleTrip = (id) => {
  type: TOGGLE_TRIP,
  id
}

let fetchTrip = () => {
  type: FETCH_TRIP
}

let fetchTripSuccess = trip => {
  type: FETCH_TRIP_SUCCESS,
  trip
}

let hasLegs = directions => {
  type: HAS_LEGS
  directions
}

let completedTrip = () => {
  type: COMPLETED_TRIP
}

let getTrip = id => dispatch => {
  dispatch(fetchTrip())
  return fetch(`/api/v1/trips/${id}.json`, {
    credentials: "same-origin",
    headers: {"Content-Type": "application/json"}
  }) .then(response => response.json())
  .then(tripObject => {
    debugger
    if (!tripObject.trip.has_legs) {
      dispatch(noLegs(tripObject.directions))
    }
    if (tripOject.trip.completed) {
      dispatch(completedTrip())
    }
    dispatch(fetchTripSuccess(tripObject.trip))
  })
}

export {
  toggleTrip,
  fetchTrip,
  fetchTripSuccess,
  hasLegs,
  getTrip
}
