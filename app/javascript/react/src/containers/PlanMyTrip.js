import React, { Component } from 'react'
import { Route, NavLink, Switch } from 'react-router-dom'
import Home from './HomeContainer'
import TripShowContainer from './TripShowContainer'
import NewTrip from './tripPlanning/NewTrip'


class PlanMyTrip extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.handleEnRoute = this.handleEnRoute.bind(this)
  }

  handleChange(event) {
    this.setState({ start: event.target.value })
  }

  handleEnRoute(trip) {
    this.props.handleEnRoute(trip)
  }

  render() {
    return(
      <div>
        <Switch>
          <Route path='/show/:id/:title' render={props =>(<TripShowContainer handleEnRoute={this.handleEnRoute} {...props} />)} />
          <Route strict path='/newtrip' render={props => (<NewTrip userId={this.state.userId} {...props} />)} />
          <Route exact path='/' component={Home} />
        </Switch>
      </div>
    )
  }
}

export default PlanMyTrip
