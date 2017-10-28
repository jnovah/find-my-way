import React, { Component } from 'react'
import { NavLink, Switch, Route } from 'react-router-dom'
import Start from '../components/Start'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  calculateBaseDistance(formPayLoad) {
    fetch
  }

  render() {
    return(
      <Switch>
        <Route path='/start' component={Start} />
        <NavLink to='/start'>
        <button>Lets Start Planning!</button>
      </NavLink>
    </Switch>
  )
  }
}

export default Home
