import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import { setPlaceAddress } from '../actions/setValue'

const mapStateToProps = state => {
  return {
    place: state.tripForm.place
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setPlaceAddress: (address) => { dispatch(setPlaceAddress(address)) }
  }
}

class PlacesContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: '',
      name: '',
      errors: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.formPayLoad = this.formPayLoad.bind(this)
    this.handleFormClear = this.handleFormClear.bind(this)
  }

  componentDidMount() {
    this.setState({ type: this.props.type, tripId: this.props.tripId })
  }

  handleChange(event){
    this.props.setPlaceAddress(event)
  }

  handleSubmit(event) {
    event.preventDefault()
    geocodeByAddress(this.state.address)
    .then(results => {
      return getLatLng(results[0])
    }) .then(latLng => {
      let payLoad = this.formPayLoad(latLng)
      this.props.addNewPlace(payLoad, this.props.type)
      this.handleFormClear()
    })
  }

  formPayLoad(coordinates){
    let payLoad
    if (coordinates.lat !== '' && coordinates.lng !== '') {
      payLoad = { address: this.state.address, trip_id:this.props.tripId }
    } else {
      errors = this.state.errors
      errors.push('Must be a valid address')
      this.setState({ errors: errors })
    }
    return payLoad
  }

  handleFormClear() {
    this.setState({address: '', lat: '', long: ''})
  }

  render(){
    let inputProps = {
      value: this.props.place.address,
      onChange: this.handleChange,
      placeholder: this.props.placeholder
    }
    let errors
    if (this.state.errors) {
      errors = this.state.errors
    }
    console.log(this.props.place.address);
    return(
      <div className= "places-form-container">
        <div className="destination place">Seach for a location below by address or name</div>
        <form className='places-form' onSubmit={this.handleSubmit}>
          <div className='places-ac'><PlacesAutocomplete inputProps={inputProps} /></div>
          <input className="" type='submit' name='Next' />
        </form>
      </div>
    )
  }
}

const Places = connect(mapStateToProps, mapDispatchToProps)(PlacesContainer)

export default Places
