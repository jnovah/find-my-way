import React, { Component } from 'react'
import TripDestinationTile from '../components/TripDestinationTile'

class TripShowContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      trip: {},
      destinations: {}
    }
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
      </div>
    )
  }
}

export default TripShowContainer
