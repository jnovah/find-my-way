import React, { Component } from 'react'
import { connect } from 'react-redux'
import { initMap, initDirectionsRenderer, pingGoogle } from '../actions/renderDirections'



const mapStateToProps = state => {
  return {
    mapLoaded: state.directionsMap.mapLoaded,
    map: state.directionsMap.map,
    origin: state.trip.origin,
    destination: state.trip.final,
    stops: state.trip.stops,
    directionsDisplay: state.directionsMap.directionsDisplay
  }
}

const mapDispatchToProps = dispatch => {
  return {
    initMap: (origin) => { dispatch(initMap(origin)) },
    initDirectionsRenderer: (origin, dest) => { dispatch(initDirectionsRenderer(origin, dest)) },
    pingGoogle: () => { dispatch(pingGoogle()) }
  }
}

class DirectionsMapTileContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.pingGoogle()
  }

  componentDidMount(){
  }

  componentDidUpdate(prevProps) {
    !!this.props.origin.coordinates && !prevProps.origin.coordinates ? this.props.initMap(this.props.origin.coordinates)
    : this.props.mapLoaded && !prevProps.mapLoaded ? this.props.initDirectionsRenderer(this.props.origin.coordinates, this.props.destination.coordinates)
    : !!this.props.directionsDisplay && !prevProps.directionsDisplay ? this.props.directionsDisplay.setMap(this.props.map)
    : null
  }

  render() {
    return(
      <div id='directions-map' className={!this.props.mapLoaded ? 'hidden' : ''}></div>
    )
  }
}

const DirectionsMapTile = connect(mapStateToProps, mapDispatchToProps)(DirectionsMapTileContainer)

export default DirectionsMapTile
