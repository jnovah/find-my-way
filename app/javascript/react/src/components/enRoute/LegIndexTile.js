import React, { Component } from 'react'

const LegIndexTile = props => {
  let className
  let current
  if (props.leg.leg.current) {
    className = 'current'
    current = <div className='current-text column small-12'>Current Leg</div>
  } else {
    className = ''
  }
  return(
    <div className={`leg-tile destination column small-12 end index-tile ${className}`}>
      <div>Leg: {props.leg.leg.order}</div>
      <div className='column small-6'>Starting Location:<br/> {props.leg.origin.address}</div>
      <div className='column small-6 index-text'>Final Destination:<br/> {props.leg.destination.address}</div>
      {current}
    </div>
  )
}

export default LegIndexTile
