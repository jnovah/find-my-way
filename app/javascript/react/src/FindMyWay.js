import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import PlanMyTrip from './containers/PlanMyTrip'
import EnRoute from './containers/EnRoute'

class FindMyWay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      enRoute: false,
      trip: []
    }
    this.handleEnRoute = this.handleEnRoute.bind(this)
  }

  componentDidMount() {
    fetch('api/v1/trips/get_en_route.json', {
      credentials: "same-origin",
      headers: {"Content-Type": "application/json"}
    }) .then(response => response.json())
    .then(body => {
      if (body.trip.length === 1) {
        this.setState({ enRoute: true, trip: body.trip })
      }
    })
  }

  handleEnRoute(trip) {
    this.setState({ enRoute: true, trip: [...this.state.trip, trip] })
  }

  render(){
    let renderComponent
    if (this.state.enRoute) {
      renderComponent = <BrowserRouter><EnRoute trip={this.state.trip} /></BrowserRouter>
    } else {
      renderComponent = <BrowserRouter><PlanMyTrip handleEnRoute={this.handleEnRoute} /></BrowserRouter>
    }
    return(
      <div className="row">
        {renderComponent}
      </div>
    )
  }
}

export default FindMyWay
