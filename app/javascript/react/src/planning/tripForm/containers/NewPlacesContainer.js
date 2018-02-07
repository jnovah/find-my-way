import React, { Component } from 'react'
import { Route, Switch, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import Places from './Places'
import PlacesEndpointTile from '../components/PlacesEndpointTile'
import PreviewMapTile from '../components/PreviewMapTile'
import { initPreviewMap, pingGoogle, setMarker, updateMarker } from '../actions/getPreview'

const mapStateToProps = state => {
  return {
    currentTrip: state.trip.currentTrip,
    mapLoaded: state.previewMap.mapLoaded,
    previewMap: state.previewMap.previewMap,
    previewMarker: state.previewMap.marker,
    place: state.tripForm.place,
    markerUpdating: state.previewMap.markerUpdating
  }
}

const mapDispatchToProps = dispatch => {
  return {
    pingGoogle: () => { dispatch(pingGoogle()) },
    setMarker: (coordinates, address, map) => { dispatch(setMarker(coordinates, address, map)) },
    updateMarker: (coordinates, address, map) => { dispatch(updateMarker(coordinates, address, map)) }
  }
}

class NewPlaceFormContainer extends Component {
  constructor(props) {
    super(props)
    this.moveMarker = this.moveMarker.bind(this)
  }

  componentDidMount() {
    this.props.pingGoogle()
  }

  componentDidUpdate(prevProps) {
    !prevProps.mapLoaded && this.props.mapLoaded ? this.props.setMarker(this.props.place.coordinates, this.props.place.address, this.props.previewMap)
    : !!prevProps.previewMarker && this.props.place.coordinates !== prevProps.place.coordinates ? this.moveMarker(this.props.place.coordinates, this.props.place.address, this.props.previewMap)
    : prevProps.previewMarker.position !== this.props.previewMarker.position && this.props.mapLoaded && !!this.props.previewMap ? this.props.previewMap.panTo(this.props.previewMarker.position)
    : null
  }

  moveMarker() {
    this.props.previewMap.setCenter(this.props.place.coordinates)
    this.props.previewMarker.setPosition(this.props.place.coordinates)
  }


  render() {
    return(
      <div className="places-form-container">
        <div className="trip-plan-container">
          <Places />
          <PreviewMapTile />
        </div>
      </div>
    )
  }
}

const NewPlaceForm = connect(mapStateToProps, mapDispatchToProps)(NewPlaceFormContainer)

export default NewPlaceForm
