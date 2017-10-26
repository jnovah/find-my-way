import React, { Component } from 'react'
import { Route, NavLink, Switch } from 'react-router-dom'
import Home from './HomeContainer'

class PlanMyTrip extends Component {
  constructor(props) {
    super(props)
    this.state = {
      start: ''
    }

  }

  handleChange(event) {
    this.setState({ start: event.target.value })
  }

  render() {
    return(
      <Switch>
        <Route path='/' component={Home} />
      </Switch>
    )
  }
}

export default PlanMyTrip
