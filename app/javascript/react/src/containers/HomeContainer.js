import React, { Component } from 'react'
import { NavLink, Switch, Route } from 'react-router-dom'
import TripIndexTile from '../components/TripIndexTile'
import NewTrip from './tripPlanning/NewTrip'
import IndexContainer from './IndexContainer'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tripsInPlanning: [],
      completedTrips: []
    }
  }

  componentDidMount() {
    fetch('/api/v1/trips', {
      credentials: "same-origin",
      headers: {"Content-Type": "application/json"}
    }) .then(response => response.json())
    .then(body => {
      let tripsInPlanning = []
      let completedTrips = []
      body.trips.map(trip => {
        if (trip.status === 'planning') {
          tripsInPlanning.push(trip)
        } else {
          completedTrips.push(trip)
        }
      })
      this.setState({ tripsInPlanning: tripsInPlanning, completedTrips: completedTrips })
    })
  }

  render() {
    return(
      <div className='index-container'>
        <div className='new-trip-button'>
          <NavLink to='/newtrip/start'><button className="btn btn-4 btn-4c add-new">Plan a new trip!</button></NavLink>
        </div>
        <div className='trip-types'>
          <div className='trips-index-container depth'>
            <NavLink to='/trips-in-planning/'><h1 className='trips-index'>Trips in Planning</h1></NavLink>
          </div>
          <div className='trips-index-container depth'>
            <NavLink to='/completed-trips/'><h1 className='trips-index'>Completed Trips</h1></NavLink>
          </div>
        </div>
        <div>
          <Switch>
            <Route strict path='/completed-trips/' render={props => (<IndexContainer trips={this.state.completedTrips} {...props} />)}/>
            <Route strict path='/trips-in-planning/' render={props => (<IndexContainer trips={this.state.tripsInPlanning} {...props} />)}/>
          </Switch>
        </div>
      </div>
    )
  }
}

export default Home
