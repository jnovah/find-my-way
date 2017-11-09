import React from 'react'

const TripDestinationTile = props => {
  let label
  let address
  if (props.type === 'start') {
    label = "Starting Location"
    address = props.location.address
  } else if (props.type === 'end') {
    label = "Final Destination"
    address = props.location.address
  } else if (props.type === 'stops'){
    label = "Pit-Stops"
    let entry = props.location.map(stop => {
      return(
        <li>{stop.address}</li>
      )
    })
    address = <ul>{entry}</ul>
  }
  return(
    <div className="destination">{label}:<br/>{address}</div>
  )
}

export default TripDestinationTile
