import { FORM_ORDER, FORM_VALID, SUBMIT_FORM_SUCCESS, SET_PLACE_FORM, SET_SAVED_PLACE, START_PLACE_FORM_SUBMISSION, PLACE_FORM_SUBMISSION_SUCCESS } from '../actions/submitForms'
import { SET_PLACE_ADDRESS } from '../actions/setValue'
import { SET_GEOCODE, SET_PLACE_ID } from '../actions/getPreview'

let initialState = {
  tripFormValid: false,
  formType: 'trip',
  placeForm: false,
  place: {
    address: '',
    coordinates: {},
    placeId: ''
  },
  placeComplete: false,
  submittingPlaceForm: false
}

const tripForm = (state = initialState, action) => {
  switch (action.type) {
    case FORM_VALID:
      return Object.assign({}, state, { [action.form + 'FormValid']: true })
    case SUBMIT_FORM_SUCCESS:
      return Object.assign({}, state, {
        formType: FORM_ORDER[action.formType],
      })
    case SET_PLACE_FORM:
      return Object.assign({}, state, { placeForm: true })
    case SET_PLACE_ADDRESS:
      return Object.assign({}, state, { place: Object.assign({}, state.place, { address: action.address }) })
    case SET_GEOCODE:
      return Object.assign({}, state, {
        place: Object.assign({}, state.place, { coordinates: action.geocode }),
        placeComplete: true
      })
    case SET_PLACE_ID:
      return Object.assign({}, state, {
        place: Object.assign({}, state.place, {
          placeId: action.placeId,
          address: action.address
        })
      })
    case SET_SAVED_PLACE:
      return Object.assign({}, state, {
        place: initialState.place,
        placeComplete: false
      })
    case START_PLACE_FORM_SUBMISSION:
      return Object.assign({}, state, {
        submittingPlaceForm: true
      })
    case PLACE_FORM_SUBMISSION_SUCCESS:
      return Object.assign({}, state, {
        formType: FORM_ORDER[action.formType],
        submittingPlaceForm: false
      })
    default:
      return state
  }
}

export default tripForm
