import React, { Component } from 'react'
import { Switch, Route, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { getTrip, newTripForm } from '../actions/tripShow'
import { pingGoogle, initMap, getGeocode } from '../actions/getMap'
import TripDestinationTile from '../components/TripDestinationTile'
import Places from '../../tripForm/containers/Places'
import MapTile from '../components/MapTile'

const mapStateToProps = state => {
  return {
    trip: state.trip,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTrip: (id) => { dispatch(getTrip(id)) },
    newTripForm: () => { dispatch(newTripForm()) },
    pingGoogle: () => { dispatch(pingGoogle()) },
    initMap: (center) => { dispatch(initMap(center))},
    setOriginMap: (address) => { dispatch(setOriginMap(address)) }
  }
}

class TripShowContainer extends Component {
  constructor(props) {
    super(props)
    this.handleStopSubmit = this.handleStopSubmit.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentWillMount() {
    if (!this.props.trip.tripForm) {
      this.props.getTrip(this.props.match.params.id)
    }
  }

  componentDidMount() {
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
    let destination = this.props.trip.stops.map((stop, index) => {
      return(
        <TripDestinationTile type='stops' location={stop} key={`stop${index}`}/>
      )
    })
    if (this.props.trip.completed || this.props.trip.tripForm) {
      className = 'hidden'
    }
    return(
      <div>
        <div className=''>
          <h1>{this.props.trip.title}</h1>
          <div className="destination">{this.props.trip.description}</div>
          <div className={`${className} origin-trip-button `}>
            <button className='btn btn-4 btn-4c add-new' onClick={this.handleClick}>Origin Trip</button>
          </div>
          <div id='origin' className={`destination-container row ${this.props.trip.origin.length === 0 ? 'hidden' : ''}`}>
            <TripDestinationTile type='origin' location={this.props.trip.origin} key='origin'/>
          </div>
          <div id='final' className={`destination-container row ${this.props.trip.final.length === 0 ? 'hidden' : ''}`}>
            <TripDestinationTile type='final' location={this.props.trip.final} key='final'/>
          </div>
          <div id='stop' className={`destination-container row `}>{destination}
          </div>
        </div>
        <div className={className}>
          <div className="destination place">Add a new Pit-Stop</div>
          <Places tripId={this.props.trip.currentTrip} type='stop' addNewPlace={this.handleStopSubmit}/>
        </div>
        <MapTile/>
      </div>
    )
  }
}

const TripShow = connect(
  mapStateToProps, mapDispatchToProps
)(TripShowContainer)

export default TripShow
