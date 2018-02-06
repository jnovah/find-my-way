import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import { setPlaceAddress } from '../actions/setValue'
import { getGeocode } from '../../tripShow/actions/getMap'
import { savePlace } from '../actions/submitForms'

const mapStateToProps = state => {
  return {
    place: state.tripForm.place,
    placeComplete: state.tripForm.placeComplete,
    tripId: state.trip.currentTrip,
    formType: state.tripForm.formType
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setPlaceAddress: (address) => { dispatch(setPlaceAddress(address)) },
    getGeocode: (address) => { dispatch(getGeocode(address)) },
    savePlace: (address, tripId, type) => { dispatch(savePlace(address, tripId, type)) }
  }
}

class PlacesContainer extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidUpdate() {
  }

  handleChange(event){
    this.props.setPlaceAddress(event)
  }

  handleSelect(event) {
    this.props.setPlaceAddress(event)
    this.props.getGeocode(event)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.savePlace(this.props.place, this.props.tripId, this.props.formType)
  }

  render(){
    let inputProps = {
      value: this.props.place.address,
      onChange: this.handleChange
    }

    return(
      <div className= "places-form-container">
        <div className="destination place">Seach for a location below by address or name</div>
        <form className='places-form' onSubmit={this.handleSubmit}>
          <div className='places-ac'><PlacesAutocomplete inputProps={inputProps} onSelect={this.handleSelect}/></div>
          <input className="" type='submit' value='Add & Continue' />
        </form>
      </div>
    )
  }
}

const Places = connect(mapStateToProps, mapDispatchToProps)(PlacesContainer)

export default Places
