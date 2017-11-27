import React, { Component } from 'react'
import { Route, NavLink, Switch } from 'react-router-dom'
import Home from './HomeContainer'
import TripShowContainer from './TripShowContainer'
import NewTrip from './tripPlanning/NewTrip'
import TopBar from './TopBar'

class PlanMyTrip extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.handleEnRoute = this.handleEnRoute.bind(this)
    this.legMapper = this.legMapper.bind(this)
    this.createLegs = this.createLegs.bind(this)
  }

  handleEnRoute(trip) {
    fetch(`/api/v1/trips/${trip.id}/directions.json`, {
      method: "POST",
      credentials: "same-origin",
      headers: {"Content-Type": "application/json"}
    }) .then(response => response.json())
    }

  render() {
    return(
      <div>
        <TopBar />
        <Switch>
          <Route path='/show/:id/:title' render={props =>(<TripShowContainer handleEnRoute={this.handleEnRoute} {...props} />)} />
          <Route strict path='/newtrip' render={props => (<NewTrip userId={this.state.userId} {...props} />)} />
          <Route path='/' component={Home} />
        </Switch>
      </div>
    )
  }
}

export default PlanMyTrip
