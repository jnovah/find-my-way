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
      types: { start: false, end: false },
      className: ''
    }
    this.addNewTrip = this.addNewTrip.bind(this)
  }

  componentDidMount() {
    fetch('http://localhost:5000/api/v1/users/user_id.json', {
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
      this.setState({ className: 'hidden' })
    })
  }

  render() {
    let view
    let place
    if (this.state.trip.id) {
      place = <NewPlacesContainer tripId={this.state.trip.id} />
    }
    if (this.state.trip.id) {
      view = <div className="small-6 cell"><h1>{this.state.trip.title}</h1><div>Description:<br/>{this.state.trip.description}</div></div>
    }

    return(
      <div>
        <div className={`${this.state.className} small-6 column`}>
          <Switch>
            <Route strict path='/newtrip/start' render={props => (<NewTripFormContainer userId={this.state.userId} addNewTrip={this.addNewTrip} {...props} />)} />
          </Switch>
        </div>
        <div className="">
          {view}
        </div>
        <div className="">
          {place}
        </div>
      </div>
    )
  }
}

export default NewTrip
