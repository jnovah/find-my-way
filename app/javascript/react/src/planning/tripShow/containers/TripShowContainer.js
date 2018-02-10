import React, { Component } from 'react'
import { Switch, Route, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { getTrip, newTripForm } from '../actions/tripShow'
import { pingGoogle, initMap, getGeocode } from '../actions/renderDirections'
import TripDestinationTile from '../components/TripDestinationTile'
import NewPlaceForm from '../../tripForm/containers/NewPlacesContainer'
import DirectionsMapTile from '../components/DirectionsMapTile'

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
  }

  componentWillMount() {
    if (!this.props.trip.tripForm) {
      this.props.getTrip(this.props.match.params.id)
    }
  }

  componentDidMount() {
  }

  render() {
    let className
    let destination = this.props.trip.stops.map((stop, index) => {
      return(
        <TripDestinationTile type='stop' location={stop} key={`stop${index}`}/>
      )
    })

    return(
      <div>
        <div className=''>
          <h1>{this.props.trip.title}</h1>
          <div className="destination">{this.props.trip.description}</div>
          <div className={this.props.trip.tripForm ? 'hidden' : ''}>
            <div className="destination place">Add a new Pit-Stop</div>
            <NewPlaceForm type='stop'/>
          </div>
          <div id='origin' className={`destination-container row ${this.props.trip.origin.length === 0 ? 'hidden' : ''}`}>
            <TripDestinationTile type='origin' location={this.props.trip.origin} key='origin'/>
          </div>
          <div id='final' className={`destination-container row ${this.props.trip.final.length === 0 ? 'hidden' : ''}`}>
            <TripDestinationTile type='final' location={this.props.trip.final} key='final'/>
          </div>
          <div id='stop' className={`destination-container row `}>{destination}</div>
        </div>
        <DirectionsMapTile />
        <div className={`${this.props.trip.tripForm ? 'hidden' : ''} start-trip-button `}>
          <button className='btn btn-4 btn-4c add-new' onClick={this.handleClick}>Start Trip</button>
        </div>
      </div>
    )
  }
}

const TripShow = connect(
  mapStateToProps, mapDispatchToProps
)(TripShowContainer)

export default TripShow
