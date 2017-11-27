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

  legMapper(waypointOrder, trip) {
    let nestedPayLoad = waypointOrder.map((waypoint, index) => {
      if (index == 0) {
        return([{ trip_id: trip.trip.id, origin_id: trip.start.id, destination_id: trip.stops[waypoint].id, current: true, order: index+1}, { trip_id: trip.trip.id, origin_id: trip.stops[waypoint].id, destination_id: trip.stops[waypoint+1].id, current: false, order: index+2}])
      } else if (index === waypointOrder.length-1) {
        return({ trip_id: trip.trip.id, origin_id: trip.stops[waypoint].id, destination_id: trip.end.id , current: false, order: index+2})
      } else {
        return({ trip_id: trip.trip.id, origin_id: trip.stops[waypoint].id, destination_id: trip.stops[waypoint+1].id, current: false, order: index+2})
      }
    })
    let legPayLoad
    if (waypointOrder.length > 0) {
      legPayLoad = [].concat.apply([], nestedPayLoad)
    } else if (waypointOrder.length === 0) {
      legPayLoad = { trip_id: trip.trip.id, origin_id: trip.start.id, destination_id: trip.end.id , current: true, order: 1}
    }
    return { legs: legPayLoad }
  }

  createLegs(legPayLoad, trip) {
    fetch(`/api/v1/trips/${trip.id}/legs`, {
      method: "POST",
      body: JSON.stringify(legPayLoad),
      credentials: "same-origin",
      headers: {"Content-Type": "application/json"}
    }) .then(this.props.handleEnRoute())
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
