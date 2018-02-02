import React, { Component } from 'react'
import { Route, Switch, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import Places from './Places'
import PlacesEndpointTile from '../components/PlacesEndpointTile'

const mapStateToProps = state => {
  return {
    currentTrip: state.trip.currentTrip
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

class NewPlaceFormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.addNewPlace = this.addNewPlace.bind(this)
  }

  componentDidMount() {
  }

  addNewPlace(payLoad, type) {
    fetch(`/api/v1/places/${type}_create.json`, {
      method: "POST",
      body: JSON.stringify(payLoad),
      credentials: "same-origin",
      headers: {"Content-Type": "application/json"}
    }) .then(response => {
        return response.json()})
    .then(body => {
      let typeUpdate = Object.assign({}, this.state.types)
      typeUpdate[type] = true
      this.setState({ places: [...this.state.places, body], types: typeUpdate })
    })
  }


  render() {
    return(
      <div className="places-form-container">
        <div className="trip-plan-container">
          <Places tripId={this.state.tripId} type={this.props.formType} placeholder='Add a starting location!' addNewPlace={this.addNewPlace}/>
        </div>
      </div>
    )
  }
}

const NewPlaceForm = connect(mapStateToProps, mapDispatchToProps)(NewPlaceFormContainer)

export default NewPlaceForm
