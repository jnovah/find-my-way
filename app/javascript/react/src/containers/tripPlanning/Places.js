import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'


class Places extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '',
      type: '',
      lat: '',
      long: '',
      placeId: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.formPayLoad = this.formPayLoad.bind(this)
  }

  componentDidMount() {
    this.setState({ type: this.props.type, tripId: this.props.tripId })
  }

  handleChange(event){
    this.setState({ address: event })
  }

  handleSubmit(event) {
    event.preventDefault()
    geocodeByAddress(this.state.address)
    .then(results => {
      return getLatLng(results[0])
    }) .then(latLng => {
      let payLoad = this.formPayLoad(latLng)
      this.props.addNewPlace(payLoad, this.state.type)
    })

  }

  formPayLoad(coordinates){
    let payLoad = { address: this.state.address, lat: coordinates.lat, long: coordinates.lng, trip_id:this.props.tripId}
    return payLoad
  }

  render(){
    let inputProps = {
      value: this.state.address,
      onChange: this.handleChange,
      placeholder: this.props.placeholder
    }
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <PlacesAutocomplete inputProps={inputProps} />
          <input type='submit' name='Next' />
        </form>
      </div>
  )
  }
}

export default Places
