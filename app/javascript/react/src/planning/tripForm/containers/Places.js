import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import { setPlaceAddress } from '../actions/setValue'
import { getGeocode } from '../../tripShow/actions/getMap'

const mapStateToProps = state => {
  return {
    address: state.tripForm.place.address,
    placeComplete: state.tripForm.placeComplete
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setPlaceAddress: (address) => { dispatch(setPlaceAddress(address)) },
    getGeocode: (address) => { dispatch(getGeocode(address)) }
  }
}

class PlacesContainer extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }

  componentDidUpdate() {
  }

  handleChange(event){
    this.props.setPlaceAddress(event)
  }

  handleSelect(event) {
    this.props.getGeocode(event)
    this.props.placeComplete
  }

  render(){
    let inputProps = {
      value: this.props.address,
      onChange: this.handleChange
    }

    return(
      <div className= "places-form-container">
        <div className="destination place">Seach for a location below by address or name</div>
        <form className='places-form' onSubmit={this.handleSubmit}>
          <div className='places-ac'><PlacesAutocomplete inputProps={inputProps} onSelect={this.handleSelect}/></div>
          <input className="" type='submit' name='Next' />
        </form>
      </div>
    )
  }
}

const Places = connect(mapStateToProps, mapDispatchToProps)(PlacesContainer)

export default Places
