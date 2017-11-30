import React, { Component } from 'react'
import { Route, NavLink, Switch } from 'react-router-dom'
import Home from './HomeContainer'
import NewTrip from './tripPlanning/NewTrip'
import TopBar from './TopBar'
import Index from './IndexContainer'

class PlanMyTrip extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.handleEnRoute = this.handleEnRoute.bind(this)
  }

  handleEnRoute(trip) {
    fetch(`/api/v1/trips/${trip.id}/directions.json`, {
      method: "POST",
      credentials: "same-origin",
      headers: {"Content-Type": "application/json"}
    }) .then(response => response.json())
    }

  render() {
    return(
      <div>
        <TopBar />
        <Switch>

          <Route strict path='/newtrip' render={props => (<NewTrip userId={this.state.userId} {...props} />)} />
          <div>
            <div className='new-trip-button'>
              <NavLink to='/newtrip/start'><button className="btn btn-4 btn-4c add-new">Plan a new trip!</button></NavLink>
            </div>
          </div>
        </Switch>
        <Switch>
          <Route strict path={`${this.props.match.path}index`} component={Home} />
          <div className='new-trip-button'>
            <NavLink to={`${this.props.match.path}index`}><button className="btn btn-4 btn-4c add-new">View all created trips!</button></NavLink>
          </div>
        </Switch>
      </div>
    )
  }
}

export default PlanMyTrip
