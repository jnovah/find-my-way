import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import LegIndexTile from '../../components/enRoute/LegIndexTile'

class EnRouteDirectionsConatainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      directions: {},
      trip: {},
      routes: [],
      tripComplete: false
    }
    this.handleComplete = this.handleComplete.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentWillMount() {
    fetch('/api/v1/trips/get_en_route', {
      credentials: "same-origin",
      headers: {"Content-Type": "application/json"}
    }) .then(response => response.json())
    .then(body => {
      this.setState({ trip: body.trip, routes: body.routes, tripComplete: body.trip_complete })
    })
  }

  handleComplete(legId) {
    fetch(`/api/v1/trips/${this.state.trip.id}/legs/${legId}`, {
      method: 'PATCH',
      credentials: "same-origin",
      headers: {"Content-Type": "application/json"}
    }) .then(response => response.json())
    .then(body => {
      if (body.routes && !body.trip_complete) {
        this.setState({ routes: body.routes })
      } else if (body.trip_complete) {
        this.setState({ tripComplete: true, routes: body.routes })
      }
    })
  }

  handleClick() {
    this.props.tripComplete(this.state.trip.id)
    this.props.history.push('/')
  }

  render() {
    let tripComplete
    if (this.state.tripComplete) {
      tripComplete = <div className='leg-complete'><button className='depth' onClick={this.handleClick}>This trip is complete!</button></div>
    }
    let legTile = this.state.routes.map((leg, index) => {
      return(
        <LegIndexTile leg={leg} handleComplete={this.handleComplete} key={`enR${index}`}/>
      )
    })
    return(
      <div>
        <div className='image leg-list'>
          <h1 className='column small-12'>{this.state.trip.title}</h1>
          <div className='destination column small-12'>{this.state.trip.description}</div>
          {legTile}
        </div>
        {tripComplete}
      </div>
    )
  }
}

export default EnRouteDirectionsConatainer
