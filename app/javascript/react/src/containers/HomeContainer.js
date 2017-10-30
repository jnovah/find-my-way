import React, { Component } from 'react'
import { NavLink, Switch, Route } from 'react-router-dom'
import NewTrip from '../components/tripPlanning/NewTrip'
import Start from '../components/tripPlanning/Start'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return(
      <Switch>
        <Route path='/new_trip' component={NewTrip} />
        <NavLink to='/new_trip'>
        <button>Create a New Trip to Plan!</button>
      </NavLink>
    </Switch>
  )
  }
}

export default Home
