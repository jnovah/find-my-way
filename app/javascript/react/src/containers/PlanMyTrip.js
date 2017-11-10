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
    const DirectionsService = new google.maps.DirectionsService();
    let waypointsArray = trip.stops.map(stop => {
      return(
        {location: new google.maps.LatLng(stop.lat, stop.long)}
      )
    })
      DirectionsService.route({
        origin: new google.maps.LatLng(trip.start.lat, trip.start.long),
        destination: new google.maps.LatLng(trip.end.lat, trip.end.long),
        waypoints: waypointsArray,
        travelMode: google.maps.TravelMode.DRIVING,
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          let legPayLoad = this.legMapper(result.routes[0].waypoint_order, trip)
          this.createLegs(legPayLoad, trip.trip)
        }
      })
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
      debugger
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
        <div className='image'>
          <Switch>
            <Route path='/show/:id/:title' render={props =>(<TripShowContainer handleEnRoute={this.handleEnRoute} {...props} />)} />
            <Route strict path='/newtrip' render={props => (<NewTrip userId={this.state.userId} {...props} />)} />
            <Route exact path='/' component={Home} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default PlanMyTrip
