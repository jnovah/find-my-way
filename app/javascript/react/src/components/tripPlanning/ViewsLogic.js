import React from 'react'
import { Route, Switch, NavLink } from 'react-router-dom'

const ViewsLogic = props => {
  return(
    <div>
      <NavLink to='/new_trip/start'>
        <input type='button' name='Add trip details' />
      </NavLink>
    </div>
  )
}

export default ViewsLogic
