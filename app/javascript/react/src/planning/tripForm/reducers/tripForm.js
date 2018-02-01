import { FORM_VALID, FORM_SUBMIT_SUCCESS } from '../actions/submitForms'

let initialState = {
  tripFormValid: false
}

const tripForm = (state = initialState, action) => {
  switch (action.type) {
    case FORM_VALID:
      return Object.assign({}, state, { [action.form + 'FormValid']: true} )
    default:
      return state
  }
}

export default tripForm
