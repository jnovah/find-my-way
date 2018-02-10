import React, { Component } from 'react'
import { Switch, Route, NavLink } from 'react-router-dom'
import TopBar from '../TopBar'
import EnRouteDirectionsContainer from './enRoute/EnRouteDirectionsContainer'

class EnRoute extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
    this.tripComplete = this.tripComplete.bind(this)
  }

  tripComplete(tripId) {
    fetch(`/api/v1/trips/complete/${tripId}`, {
      method: 'PATCH',
      credentials: "same-origin",
      headers: {"Content-Type": "application/json"}
    }) .then(response => response.json())
    .then(body => {
      this.props.handleTripComplete()
    })
  }

  render(){
    return(
      <div>
        <TopBar script='En Route'/>
        <Switch>
          <Route path='/en+route' render={props => (<EnRouteDirectionsContainer tripComplete={this.tripComplete} {...props} />)} />
          <div className='trip-details'><NavLink to='/en+route'><button className='btn btn-4 btn-4c add-new'>View Trip Details</button></NavLink></div>
        </Switch>
      </div>
    )
  }
}

export default EnRoute
