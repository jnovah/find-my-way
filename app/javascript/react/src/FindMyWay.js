import React, { Component } from 'react'
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

import TopBar from './TopBar'
import PlanMyTrip from './planning/PlanMyTrip'
import TripShow from './planning/tripShow/containers/TripShowContainer'
import EnRoute from './containers/EnRoute'
import { getAllTrips } from './planning/tripIndex/actions/getAllTrips'

const mapStateToProps = state => {
  return {
    isFetching: state.trips.isFetching,
    class: state.trips.class,
    trips: state.trips.trips
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllTrips: () => { dispatch(getAllTrips()) }
  }
}

class FindMyWayContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.getAllTrips()
  }

  componentDidUpdate() {
  }

  render(){

    return(
      <div>
        <BrowserRouter>
          <div>
            <TopBar />
            <Switch>
              <Route strict path='/show/:id/' render={props =>(<TripShow handleEnRoute={this.handleEnRoute} {...props} />)} />
              <Route strict path='/all-trips/' component={PlanMyTrip} />
              <div>
                <h1>Welcome to <strong>Find My Way</strong>!</h1>
                <p><strong>Find My Way</strong> is your ultimate road trip planning app!</p>
                <div className={`${this.props.class}`}>
                  <NavLink to='/all-trips/'><button className="btn btn-4 btn-4c add-new">Continue!</button></NavLink>
                </div>
              </div>
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

const FindMyWay = connect(
  mapStateToProps,
  mapDispatchToProps
)(FindMyWayContainer)

export default FindMyWay
