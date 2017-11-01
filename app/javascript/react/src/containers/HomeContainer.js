import React, { Component } from 'react'
import { NavLink, Switch, Route } from 'react-router-dom'
import NewTrip from './tripPlanning/NewTrip'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: ''
    }
  }

  render() {
    return(
      <Switch>
        <Route strict path='/newtrip' render={props => (<NewTrip userId={this.state.userId} {...props} />)} />
        <NavLink to='/newtrip/start'>
          Plan a new trip!
      </NavLink>
    </Switch>
  )
  }
}

export default Home
