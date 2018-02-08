export const START_PLACE_FORM_SUBMISSION = 'START_PLACE_FORM_SUBMISSION'
export const PLACE_FORM_SUBMISSION_SUCCESS = 'PLACE_FORM_SUBMISSION_SUCCESS'
export const SUBMIT_FORM_SUCCESS = 'SUBMIT_FORM_SUCCESS'
export const SET_TRIP_SHOW = 'SET_TRIP_SHOW'
export const FORM_VALID = 'FORM_VALID'
export const SET_PLACE_FORM = 'SET_PLACE_FORM'
export const SET_SAVED_PLACE = 'SET_SAVED_PLACE'
export const FORM_ORDER = { trip: 'origin', origin: 'final', final: 'show' }

let startPlaceFormSubmission = () => {
  return {
    type: START_PLACE_FORM_SUBMISSION
  }
}

let placeFormSubmissionSuccess = formType => {
  return {
    type: PLACE_FORM_SUBMISSION_SUCCESS,
    formType
  }
}

let submitFormSuccess = formType => {
  return {
    type: SUBMIT_FORM_SUCCESS,
    formType
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
  dispatch(startPlaceFormSubmission())
  let payload = { address: place.address, coordinates: place.coordinates, google_place_id: place.placeId, trip_id: tripId }
  return fetch(`/api/v1/places/${type}_create.json`, {
    method: "POST",
    body: JSON.stringify(payload),
    credentials: "same-origin",
    headers: {"Content-Type": "application/json"}
  }) .then(response => response.json())
  .then(place => {
    dispatch(setSavedPlace(place[Object.keys(place)[0]], type))
    dispatch(placeFormSubmissionSuccess(type))
  })
}

export {
  validateTripForm,
  saveTrip,
  setPlaceForm,
  savePlace,
  setSavedPlace
}
