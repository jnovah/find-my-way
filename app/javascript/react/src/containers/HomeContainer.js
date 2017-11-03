import React, { Component } from 'react'
import { NavLink, Switch, Route } from 'react-router-dom'
import TripIndexTile from '../components/TripIndexTile'
import NewTrip from './tripPlanning/NewTrip'


class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      trips: []
    }
  }

  componentDidMount() {
    fetch('/api/v1/trips', {
      credentials: "same-origin",
      headers: {"Content-Type": "application/json"}
    }) .then(response => response.json())
    .then(body => {
      this.setState({ trips: body.trips })
    })
  }

  render() {
    let trips = this.state.trips.map(trip => {
      return(
        <div className='whole-tile small-12'>
          <NavLink to={`/show/${trip.id}/${trip.title}`}><TripIndexTile trip={trip} key={trip.id}/></NavLink>
        </div>
      )
    })

    return(
      <div className='index-container'>
        <div className=''>
          <NavLink to='/newtrip/start'><button className="btn btn-4 btn-4c add-new">Plan a new trip!</button></NavLink>
        </div>
        <div className=''>
          <h1 className='trips-index'>Planned Trips</h1>
          <div className='row'>
            {trips}
          </div>

        </div>
      </div>
  )
  }
}

export default Home
