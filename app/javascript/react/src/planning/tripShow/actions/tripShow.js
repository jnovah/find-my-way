export const TOGGLE_TRIP = 'TOGGLE_TRIP'
export const FETCH_TRIP = 'FETCH_TRIP'
export const FETCH_TRIP_SUCCESS = 'FETCH_TRIP_SUCCESS'
export const HAS_LEGS = 'NO_LEGS'
export const COMPLETED_TRIP = 'COMPLETED_TRIP'
export const NEW_TRIP_FORM = 'NEW_TRIP_FORM'

let newTripForm = () => {
  return {
    type: NEW_TRIP_FORM
  }
}

let toggleTrip = (id) => {
  return {
    type: TOGGLE_TRIP,
    id
  }
}

let fetchTrip = () => {
  return {
    type: FETCH_TRIP
  }
}

let fetchTripSuccess = trip => {
  return {
    type: FETCH_TRIP_SUCCESS,
    trip
  }
}

let hasLegs = directions => {
  return {
    type: HAS_LEGS,
    directions
  }
}

let completedTrip = () => {
  return {
    type: COMPLETED_TRIP
  }
}



let getTrip = id => dispatch => {
  dispatch(fetchTrip())
  return fetch(`/api/v1/trips/${id}.json`, {
    credentials: "same-origin",
    headers: {"Content-Type": "application/json"}
  }) .then(response => response.json())
  .then(tripObject => {
    dispatch(fetchTripSuccess(tripObject.trip))
  })
}

export {
  toggleTrip,
  fetchTrip,
  fetchTripSuccess,
  hasLegs,
  getTrip,
  newTripForm
}
