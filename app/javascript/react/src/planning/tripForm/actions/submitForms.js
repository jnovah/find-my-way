export const START_SUBMIT_FORM = 'START_SUBMIT_FORM'
export const SUBMIT_FORM_SUCCESS = 'SUBMIT_FORM_SUCCESS'
export const SET_TRIP_SHOW = 'SET_TRIP_SHOW'
export const FORM_VALID = 'FORM_VALID'
export const SET_PLACE_FORM = 'SET_PLACE_FORM'

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

export {
  validateTripForm,
  saveTrip,
  setPlaceForm
}
