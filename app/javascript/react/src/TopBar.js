import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

import { getCurrentUser } from '../sharedResources/actions/getCurrentUser'

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser.item,
    isFetching: state.isFetching
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCurrentUser: () => { dispatch(getCurrentUser())}
  }
}

class TopBarContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.getCurrentUser()
  }

  render() {
    return(
      <div className='top-bar'>
        <NavLink to={'/'}><div className='column small-3 top-bar-left home-link'>FIND MY WAY</div></NavLink>
        <div className='column small-3 top-bar-left'>{this.props.script}</div>
        <div className=" profile_picture"><img  src={this.props.currentUser.picture} /></div>
        <div className='column small-3 end name'>Welcome {this.props.currentUser.first_name}!</div>
      </div>
    )
  }
}

const TopBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(TopBarContainer)

export default TopBar
