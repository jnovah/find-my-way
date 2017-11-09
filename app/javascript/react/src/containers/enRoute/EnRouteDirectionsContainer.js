import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import LegIndexTile from '../../components/enRoute/LegIndexTile'

class EnRouteDirectionsConatainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      directions: {},
      trip: {},
      routes: []
    }
  }

  componentWillMount() {
    fetch('/api/v1/trips/get_en_route', {
      credentials: "same-origin",
      headers: {"Content-Type": "application/json"}
    }) .then(response => response.json())
    .then(body => {
      this.setState({ trip: body.trip, routes: body.routes })
    })
  }


  render() {
    let legTile = this.state.routes.map((leg, index) => {
      return(
        <LegIndexTile leg={leg} key={`enR${index}`}/>
      )
    })
    return(
      <div>
        <div className='image'>
          <h1 className='column small-12'>{this.state.trip.title}</h1>
          <div className='destination column small-12'>{this.state.trip.description}</div>
          {legTile}
        </div>
      </div>
    )
  }
}

export default EnRouteDirectionsConatainer
