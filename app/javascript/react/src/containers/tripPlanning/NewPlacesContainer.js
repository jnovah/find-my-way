import React, { Component } from 'react'
import { Route, Switch, NavLink } from 'react-router-dom'
import Places from './Places'
import PlacesEndpointTile from '../../components/tripPlanning/PlacesEndpointTile'

class NewPlacesContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      types: { start: false, final: false, stop: false },
      tripId: '',
      places: []
    }
    this.addNewPlace = this.addNewPlace.bind(this)
  }

  componentDidMount() {
    this.setState({ tripId: this.props.tripId })
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
    let placeForm
    if (this.state.types.start === false) {
        placeForm = <Places tripId={this.state.tripId} type='start' placeholder='Add a starting location!' addNewPlace={this.addNewPlace}/>
    } else if (this.state.types.start === true && this.state.types.final === false) {
        placeForm = <Places tripId={this.state.tripId} type='final'placeholder='Add a final destination!' addNewPlace={this.addNewPlace}/>
    } else if (this.state.types.start === true && this.state.types.final === true){
        placeForm = <Places tripId={this.state.tripId} type='stop' placeholder='Add a pit stop!' addNewPlace={this.addNewPlace}/>
    }
    let place = this.state.places.map(place => {
      return(
        <PlacesEndpointTile place={place} />
      )
    })
    return(
      <div>
        <div className="">
          {place}
        </div>
        <div>
          {placeForm}
        </div>
      </div>
    )
  }
}

export default NewPlacesContainer
