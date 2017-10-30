import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import PlanMyTrip from './containers/PlanMyTrip'

class FindMyWay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: {}
    }
  }

  // componentDidMount() {
  //   fetch('api/v1/users')
  //   .then(response => {
  //     return response.json()
  //   })
  //   .then(body => {
  //     console.log(body);
  //   })
  // }

  render() {
    return(

      <BrowserRouter>
        <PlanMyTrip />
      </BrowserRouter>

    )
  }
}

export default FindMyWay
