export const START_SUBMIT_FORM = 'START_SUBMIT_FORM'
export const SUBMIT_FORM_SUCCESS = 'SUBMIT_FORM_SUCCESS'
export const SET_TRIP_SHOW = 'SET_TRIP_SHOW'
export const FORM_VALID = 'FORM_VALID'
export const SET_PLACE_FORM = 'SET_PLACE_FORM'
export const SET_SAVED_PLACE = 'SET_SAVED_PLACE'

let startSubmitForm = () => {
  return {
    type: START_SUBMIT_FORM
  }
}

let submitFormSuccess = form => {
  let formOrder = { trip: 'origin', origin: 'final', final: 'show' }
  return {
    type: SUBMIT_FORM_SUCCESS,
    nextForm: formOrder[form]
  }
}

let setTripShow = trip => {
  return {
    type: SET_TRIP_SHOW,
    trip
  }
}

let setFormValid = form => {
  return {
    type: FORM_VALID,
    form
  }
}

let validateTripForm = (title, description) => dispatch => {
  if (title.length > 3 && description.length > 10) {
    dispatch(setFormValid('trip'))
  }
}

let setPlaceForm = () => {
  return {
    type: SET_PLACE_FORM
  }
}

let setSavedPlace = (place, placeType) => {
  return {
    type: SET_SAVED_PLACE,
    place,
    placeType
  }
}

let saveTrip = (payload, form) => dispatch => {
  return fetch('/api/v1/trips.json', {
    method: "POST",
    body: JSON.stringify(payload),
    credentials: "same-origin",
    headers: {"Content-Type": "application/json"}
  })
  .then(response => {
    if (response.ok) {
      return response.json()
    }
  })
  .then(body => {
    dispatch(submitFormSuccess(form))
    dispatch(setTripShow(body.trip))
  })
}

let savePlace = (place, tripId, type) => dispatch => {
  let payload = { address: place.address, coordinates: place.coordinates, google_place_id: place.placeId, trip_id: tripId }
  return fetch(`/api/v1/places/${type}_create.json`, {
    method: "POST",
    body: JSON.stringify(payload),
    credentials: "same-origin",
    headers: {"Content-Type": "application/json"}
  }) .then(response => response.json())
  .then(place => {
    dispatch(setSavedPlace(place[Object.keys(place)[0]], type))
    dispatch(submitFormSuccess(type))
  })
}

export {
  validateTripForm,
  saveTrip,
  setPlaceForm,
  savePlace,
  setSavedPlace
}
