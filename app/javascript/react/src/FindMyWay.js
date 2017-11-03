import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import PlanMyTrip from './containers/PlanMyTrip'

const FindMyWay = props => {
  return(
    <div className="row">
      <BrowserRouter>
        <PlanMyTrip />
      </BrowserRouter>
    </div>
  )
}

export default FindMyWay
