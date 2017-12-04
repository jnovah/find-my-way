import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import TripIndexTile from '../components/TripIndexTile'

const mapStateToProps = state => {
  return {
    filteredTrips: state.trips.filteredTrips
  }
}

class IndexContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidUpdate() {
  }

  render() {
    let tripIndex = this.props.filteredTrips.map(trip => {
      return(
        <div className='whole-tile small-12'>
          <NavLink to={`/show/${trip.id}/${trip.title}`}><TripIndexTile trip={trip} key={trip.id}/></NavLink>
        </div>
      )
    })
    return(
      <div className='container-index'>{tripIndex}</div>
    )
  }
}

const Index = connect(mapStateToProps)(IndexContainer)

export default Index
