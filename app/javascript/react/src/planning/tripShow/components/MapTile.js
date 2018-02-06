import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setOriginMarker, updateOriginMarker } from '../actions/getMap'

const mapStateToProps = state => {
  return {
    mapLoaded: state.map.mapLoaded,
    map: state.map.map,
    originMarker: state.map.originMarker,
    placeComplete: state.tripForm.placeComplete,
    formType: state.tripForm.formType,
    place: state.tripForm.place
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setOriginMarker: (origin, address, map) => { dispatch(setOriginMarker(origin, address, map)) },
    updateOriginMarker: () => { dispatch(updateOriginMarker()) }
  }
}

class MapTileContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps) {
    !prevProps.originMarker && this.props.mapLoaded && this.props.placeComplete ?  this.props.setOriginMarker(this.props.place.placePosition, this.props.place.address, this.props.map)
    : prevProps.formType === this.props.formType && this.props.formType !== 'show' && !!prevProps.originMarker && prevProps.place.placePosition !== this.props.place.placePosition ? this.props.updateOriginMarker()
    : null
  }

  render() {
    return(
      <div id='map' className={!this.props.mapLoaded ? 'hidden' : ''}></div>
    )
  }
}

const MapTile = connect(mapStateToProps, mapDispatchToProps)(MapTileContainer)

export default MapTile
