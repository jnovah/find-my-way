import { FORM_VALID, SUBMIT_FORM_SUCCESS, SET_PLACE_FORM } from '../actions/submitForms'
import { SET_PLACE_ADDRESS } from '../actions/setValue'

let initialState = {
  tripFormValid: false,
  formType: 'trip',
  placeForm: false,
  place: {
    address: '',
    placePosition: {},
    placeID: ''
  }
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
      let place = Object.assign({}, state.place, { address: action.address })
      return Object.assign({}, state, { place: place })
    default:
      return state
  }
}

export default tripForm
