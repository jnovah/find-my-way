import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import TripIndexTile from '../components/TripIndexTile'

const IndexContainer = props => {
  let tripIndex = props.trips.map(trip => {
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

export default IndexContainer
