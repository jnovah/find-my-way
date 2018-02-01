export const SET_TEXT_VALUE = 'SET_TEXT_VALUE'
export const RESET_FORM = 'RESET_FORM'

let setTextValue = (inputType, value) => {
  return {
    type: SET_TEXT_VALUE,
    inputType, value
  }
}

let resetForm = () => {
  return {
    type: RESET_FORM
  }
}

export { resetForm, setTextValue }
