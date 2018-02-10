import React, { Component } from 'react'
import { Route, NavLink, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import Home from './tripIndex/HomeContainer'
import NewTrip from './tripForm/NewTrip'

const mapStateToProps = state => {
  return {
    tripForm: state.trip.tripForm
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

class PlanMyTripContainer extends Component {
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
    let className
    if (this.props.tripForm) {
      className = 'hidden'
    }
    return(
      <div>
        <Switch>
          <Route strict path={`${this.props.match.path}newtrip/`} component={NewTrip} />
          <div>
            <div className='new-trip-button'>
              <NavLink to={`${this.props.match.path}newtrip/`}><button className="btn btn-4 btn-4c add-new">Plan a new trip!</button></NavLink>
            </div>
          </div>
        </Switch>
        <Switch>
          <Route strict path={`${this.props.match.path}index/`} component={Home} />
          <div className={`new-trip-button ${className}`}>
            <NavLink to={`${this.props.match.path}index/`}><button className="btn btn-4 btn-4c add-new">View all created trips!</button></NavLink>
          </div>
        </Switch>
      </div>
    )
  }
}

const PlanMyTrip = connect(mapStateToProps, mapDispatchToProps)(PlanMyTripContainer)

export default PlanMyTrip
