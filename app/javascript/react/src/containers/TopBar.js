import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class TopBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      profile: {}
    }
  }

  componentWillMount() {
    fetch('/api/v1/users/user_profile.json', {
      credentials: "same-origin",
      headers: {"Content-Type": "application/json"}
    }) .then(response => response.json())
    .then(body => {
      this.setState({ profile: body.user_profile })
    })
  }

  render() {
    return(
      <div className='top-bar'>
        <NavLink to={'/'}><div className='column small-3 top-bar-left home-link'>FIND MY WAY</div></NavLink>
        <div className='column small-3 top-bar-left'>{this.props.script}</div>
        <div className=" profile_picture"><img  src={this.state.profile.picture} /></div>
        <div className='column small-3 end name'>Welcome {this.state.profile.first_name}!</div>
      </div>
    )
  }
}

export default TopBar
