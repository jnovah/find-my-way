import React from 'react'

const FormField = props => {
  return(
    <label htmlFor={props.name}>
      <input type={props.type} name={props.name} className={props.className} value={props.value} placeholder={props.label} onChange={props.handleChange} />
    </label>
  )
}

export default FormField
