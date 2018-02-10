export const SET_TEXT_VALUE = 'SET_TEXT_VALUE'
export const RESET_FORM = 'RESET_FORM'
export const SET_PLACE_ADDRESS = 'SET_PLACE_ADDRESS'

let setTextValue = (inputType, value) => {
  return {
    type: SET_TEXT_VALUE,
    inputType, value
  }
}

let setPlaceAddress = address => {
  return {
    type: SET_PLACE_ADDRESS,
    address
  }
}

let resetForm = () => {
  return {
    type: RESET_FORM
  }
}

export { resetForm, setTextValue, setPlaceAddress }
