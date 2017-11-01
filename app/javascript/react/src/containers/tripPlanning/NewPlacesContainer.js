import React, { Component } from 'react'
import { Route, Switch, NavLink } from 'react-router-dom'
import Places from './Places'

class NewPlacesContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      types: { start: false, end: false },
      tripId: '',
      places: []
    }
    this.addNewPlace = this.addNewPlace.bind(this)
  }

  componentDidMount() {
    this.setState({ tripId: this.props.tripId })
  }

  addNewPlace(payLoad, type) {
    fetch(`/api/v1/places/create_${type}.json`, {
      method: "POST",
      body: JSON.stringify(payLoad),
      credentials: "same-origin",
      headers: {"Content-Type": "application/json"}
    }) .then(response => {
        return response.json()})
    .then(body => {
      // typeUpdate = Object.assign({}, this.state.types)
      // this.setState({ places})
    })
  }


  render() {
    let place
    if (this.state.types.start === false) {
        place = <Places tripId={this.state.tripId} type='start' placeholder='Add a starting location!' addNewPlace={this.addNewPlace}/>
    } else if (this.state.types.start === true && props.types.end === false) {
        place = <Places tripId={this.state.tripId} type='end'placeholder='Add a final destination!' addNewPlace={this.addNewPlace}/>
    } else if (this.state.types.start === true && props.types.end === true){
        place = <Places tripId={this.state.tripId} type='stop' placeholder='Add a pit stop!' addNewPlace={this.addNewPlace}/>
    }
    return(
      <div>
        {place}
      </div>
    )
  }
}

export default NewPlacesContainer
