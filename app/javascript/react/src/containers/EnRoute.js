import React, { Component } from 'react'
import { Switch, Route, NavLink } from 'react-router-dom'
import { DirectionsRenderer, GoogleMap, Map } from "react-google-maps";
import TopBar from './TopBar'
import EnRouteDirectionsContainer from './enRoute/EnRouteDirectionsContainer'

class EnRoute extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentWillMount() {
  }



  render(){
    return(
      <div>
        <TopBar script='En Route'/>
        <h1>Happy Travels!</h1>
        <Switch>
          <Route path='/en+route' component={EnRouteDirectionsContainer}/>)} />
          <NavLink to='/en+route'><button className='btn btn-4 btn-4c add-new'>View Trip Details</button></NavLink>
        </Switch>
      </div>
    )
  }
}

export default EnRoute
