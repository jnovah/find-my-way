import React from 'react'

const FormField = props => {
  return(
    <label htmlFor={props.name}>{props.label}<br />
      <input type={props.type} name={props.name} value={props.value} onChange={props.handleChange} />
    </label>
  )
}

export default FormField
