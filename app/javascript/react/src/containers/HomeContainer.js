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
      <div>
        <Switch>
          <Route strict path='/newtrip' render={props => (<NewTrip userId={this.state.userId} {...props} />)} />
          <NavLink to='/newtrip/start'>
          <button className="btn btn-4 btn-4c add-new">Plan a new trip!</button>
        </NavLink>
      </Switch>
      </div>
  )
  }
}

export default Home
