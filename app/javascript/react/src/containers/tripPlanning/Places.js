import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import FormField from '../../components/FormField'


class Places extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '',
      type: '',
      lat: '',
      long: '',
      placeId: '',
      name: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.formPayLoad = this.formPayLoad.bind(this)
    this.handleFormClear = this.handleFormClear.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
  }

  componentDidMount() {
    this.setState({ type: this.props.type, tripId: this.props.tripId })
  }

  handleChange(event){
    this.setState({ address: event })
  }

  handleNameChange(event) {
    let name = event.target.name
    this.setState({ [name]: event.target.value })
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
    let payLoad = { address: this.state.address, lat: coordinates.lat, long: coordinates.lng, trip_id:this.props.tripId, name: this.state.name}
    return payLoad
  }

  handleFormClear() {
    this.setState({address: '', lat: '', long: '', name: ''})
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
          <FormField
            label='Give a name for this location:'
            name='name'
            value={this.state.name}
            handleChange={this.handleNameChange}
          />
          <PlacesAutocomplete inputProps={inputProps} />
          <input type='submit' name='Next' />
        </form>
      </div>
  )
  }
}

export default Places
