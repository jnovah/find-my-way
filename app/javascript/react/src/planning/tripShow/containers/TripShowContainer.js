import React, { Component } from 'react'
import { Switch, Route, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { getTrip } from '../actions/tripShow'
import TripDestinationTile from '../components/TripDestinationTile'
import Places from '../../tripForm/containers/Places'

const mapStateToProps = state => {
  return {
    trip: state.trip.trip,
    hasLegs: state.trip.hasLegs,
    class: state.trip.class,
    directions: state.trip.directions
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTrip: (id) => { dispatch(getTrip(id)) }
  }
}

class TripShowContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      trip: {},
      destinations: {}
    }
    this.handleStopSubmit = this.handleStopSubmit.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentWillMount() {
    debugger
    this.props.getTrip(this.props.match.params.id)
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

  handleClick() {
    this.props.handleEnRoute(this.state.trip)
    // fetch(`/api/v1/trips/en_route/${this.state.trip.id}.json`, {
    //   method: "PATCH",
    //   credentials: "same-origin",
    //   headers: {"Content-Type": "application/json"}
    // }) .then(response => response.json())
    // .then(body => {
    // })
  }

  render() {
    let className
    let destination = Object.keys(this.state.destinations).map((type, index) => {
      return(
        <TripDestinationTile type={type} location={this.state.destinations[type]} key={`dest${index}`}/>
      )
    })
    if (this.state.trip.status === 'completed') {
      className = 'hidden'
    }
    return(
      <div>
        <div className='image'>
          <h1>{this.state.trip.title}</h1>
          <div className="destination">{this.state.trip.description}</div>
          <div className={`${className} start-trip-button `}>
            <button className='btn btn-4 btn-4c add-new' onClick={this.handleClick}>Start Trip</button>
          </div>
          <div className='destination-container row'>{destination}</div>
        </div>
        <div className={className}>
          <div className="destination place">Add a new Pit-Stop</div>
          <Places tripId={this.state.trip.id} type='stop' addNewPlace={this.handleStopSubmit}/>
        </div>
      </div>
    )
  }
}

const TripShow = connect(
  mapStateToProps, mapDispatchToProps
)(TripShowContainer)

export default TripShowContainer
