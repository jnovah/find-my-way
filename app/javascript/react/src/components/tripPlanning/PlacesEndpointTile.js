import React from 'react'

const PlacesEndpointTile = props => {
  return(
    <div>
      <strong>{props.place.type}: </strong> {props.place.location.name}<br/>
      Address: {props.place.location.address}
    </div>
  )
}

export default PlacesEndpointTile
