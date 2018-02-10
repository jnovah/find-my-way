import React from 'react'

const TripDestinationTile = props => {
  let label
  let address
  if (props.type === 'origin') {
    label = "Starting Location"
    address = props.location.address
  } else if (props.type === 'final') {
    label = "Final Destination"
    address = props.location.address
  } else if (props.type === 'stop'){
    label = "Pit-Stop"
    address = props.location.address
  }
  return(
    <div className="destination column small-4">{label}:<br/>{address}</div>
  )
}

export default TripDestinationTile
