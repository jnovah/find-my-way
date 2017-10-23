import React, { Component } from 'react'

class FindMyWay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: {}
    }
  }

  componentDidMount() {
    fetch('api/v1/users')
    .then(response => {
      return response.json()
    })
    .then(body => {
      console.log(body);
    })
  }

  render() {
    return(
      <h1>Hello from react</h1>
    )
  }
}

export default FindMyWay
