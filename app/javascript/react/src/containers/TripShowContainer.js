import React, { Component } from 'react'
import { Switch, Route, NavLink } from 'react-router-dom'
import TripDestinationTile from '../components/TripDestinationTile'
import Places from './tripPlanning/Places'

class TripShowContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      trip: {},
      destinations: {}
    }
    this.handleStopSubmit = this.handleStopSubmit.bind(this)
  }

  componentDidMount() {
    fetch(`/api/v1/trips/${this.props.match.params.id}.json`, {
      credentials: "same-origin",
      headers: {"Content-Type": "application/json"}
    })
    .then(response => response.json())
    .then(body => {
      this.setState({ trip: body.trip, destinations: body.destinations })
    })
  }

  handleStopSubmit(payLoad, type) {
    fetch(`/api/v1/places/${type}_create.json`, {
      method: "POST",
      body: JSON.stringify(payLoad),
      credentials: "same-origin",
      headers: {"Content-Type": "application/json"}
    })
    .then(response => response.json())
    .then(body => {
      let currentState = Object.assign({}, this.state.destinations)
      currentState.stops.push(body.location)
      this.setState({ destinations: currentState })
    })
  }
  
  render() {
    let destination = Object.keys(this.state.destinations).map((type, index) => {
      return(
        <TripDestinationTile type={type} location={this.state.destinations[type]} key={`dest${index}`}/>
      )
    })
    return(
      <div>
        <h1>{this.state.trip.title}</h1>
        <div>{this.state.trip.description}</div>
        <div>{destination}</div>
        <div>
          <div>Add a new Pit-Stop</div>
          <Places tripId={this.state.trip.id} type='stop' addNewPlace={this.handleStopSubmit}/>
        </div>

      </div>
    )
  }
}

export default TripShowContainer
