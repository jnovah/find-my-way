import { FORM_VALID, SUBMIT_FORM_SUCCESS, SET_PLACE_FORM, SET_PLACE } from '../actions/submitForms'
import { SET_PLACE_ADDRESS } from '../actions/setValue'
import { SET_GEOCODE, SET_PLACE_ID } from '../../tripShow/actions/getMap'

let initialState = {
  tripFormValid: false,
  formType: 'trip',
  placeForm: false,
  place: {
    address: '',
    placePosition: {},
    placeId: ''
  },
  placeComplete: false
}

const tripForm = (state = initialState, action) => {
  switch (action.type) {
    case FORM_VALID:
      return Object.assign({}, state, { [action.form + 'FormValid']: true })
    case SUBMIT_FORM_SUCCESS:
      return Object.assign({}, state, {
        formType: action.nextForm,
      })
    case SET_PLACE_FORM:
      return Object.assign({}, state, { placeForm: true })
    case SET_PLACE_ADDRESS:
      return Object.assign({}, state, { place: Object.assign({}, state.place, { address: action.address }) })
    case SET_GEOCODE:
      return Object.assign({}, state, {
        place: Object.assign({}, state.place, { placePosition: action.geocode }),
        placeComplete: true
      })
    case SET_PLACE_ID:
      return Object.assign({}, state, {
        place: Object.assign({}, state.place, {
          placeId: action.placeId,
          address: action.address
        })
      })
    case SET_PLACE:
      return Object.assign({}, state, {
        place: initialState.place,
        placeComplete: false
      })
    default:
      return state
  }
}

export default tripForm
