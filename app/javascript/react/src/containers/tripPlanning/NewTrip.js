import React, { Component } from 'react'
import { Switch, Route, NavLink, Redirect } from 'react-router-dom'
import ViewsLogic from '../../components/tripPlanning/ViewsLogic'
import NewTripFormContainer from './NewTripFormContainer'
import NewPlacesContainer from './NewPlacesContainer'

class NewTrip extends Component {
  constructor(props) {
    super(props)
    this.state = {
      trip: {},
      places: {},
      types: { start: false, end: false }
    }
    this.addNewTrip = this.addNewTrip.bind(this)
  }

  componentDidMount() {
    fetch('http://localhost:5000/api/v1/users.json', {
      credentials: "same-origin",
      headers: {"Content-Type": "application/json"}})
    .then(response => response.json())
    .then(body => {
      this.setState({ userId: body })
    })
  }

  addNewTrip(formPayLoad) {
    fetch('http://localhost:5000/api/v1/trips.json', {
      method: "POST",
      body: JSON.stringify(formPayLoad),
      credentials: "same-origin",
      headers: {"Content-Type": "application/json"}
    }) .then(response => response.json())
    .then(body => {
      this.setState({ trip: body.trip })
    })
  }

  render() {
    let view
    let place
    if (this.state.trip.id) {
      place = <NewPlacesContainer tripId={this.state.trip.id} retrievePlaces={this.state.retrievePlaces} />
    } else {
      place = <div>Please Create a New Trip!</div>
    }

    return(
      <div>
        <div>
          <Switch>
            <Route strict path='/newtrip/start' render={props => (<NewTripFormContainer userId={this.props.userId} addNewTrip={this.addNewTrip} {...props} />)} />
          </Switch>
        </div>
        <div>
          <h1>{this.state.trip.title}</h1>
           <div>Description:<br/>{this.state.trip.description}</div>
        </div>
        <div>
          {place}
        </div>
      </div>
    )
  }
}

export default NewTrip
