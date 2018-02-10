import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import TripIndexTile from '../components/TripIndexTile'

const mapStateToProps = state => {
  return {
    filteredTrips: state.trips.filteredTrips
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleTrip: (id) => { dispatch(toggleTrip(id)) }
  }
}

class IndexContainer extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event) {
    this.props.toggleTrip(event.target.id)
  }

  componentDidUpdate() {
  }

  render() {
    let tripIndex = this.props.filteredTrips.map(trip => {
      return(
        <div className='whole-tile small-12'>
          <NavLink to={`/show/${trip.id}/`} onClick={this.handleClick}><TripIndexTile trip={trip} key={trip.id} id={trip.id}/></NavLink>
        </div>
      )
    })
    return(
      <div className='container-index'>{tripIndex}</div>
    )
  }
}

const Index = connect(mapStateToProps, mapDispatchToProps)(IndexContainer)

export default Index
