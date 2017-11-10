import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import PlanMyTrip from './containers/PlanMyTrip'
import EnRoute from './containers/EnRoute'

class FindMyWay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      enRoute: false,
      trip: {},
      routes: []
    }
    this.handleEnRoute = this.handleEnRoute.bind(this)
    this.handleTripComplete = this.handleTripComplete.bind(this)
  }

  componentDidMount() {
    fetch('/api/v1/trips/check_en_route.json', {
      credentials: "same-origin",
      headers: {"Content-Type": "application/json"}
    }) .then(response => response.json())
    .then(body => {
      if (body.en_route) {
        this.setState({ enRoute: true })
      }
    })
  }

  handleTripComplete() {
    this.setState({ enRoute: false })
  }

  handleEnRoute() {
    this.setState({ enRoute: true })
  }

  render(){
    let renderComponent
    if (this.state.enRoute) {
      renderComponent = <BrowserRouter><EnRoute trip={this.state.trip} handleTripComplete={this.handleTripComplete} /></BrowserRouter>
    } else {
      renderComponent = <BrowserRouter><PlanMyTrip handleEnRoute={this.handleEnRoute} /></BrowserRouter>
    }
    return(
      <div className="">
        {renderComponent}
      </div>
    )
  }
}

export default FindMyWay
