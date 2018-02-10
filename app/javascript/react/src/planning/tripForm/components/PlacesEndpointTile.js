import React from 'react'

const PlacesEndpointTile = props => {
  return(
    <div className="endpoint column small-6 medium-4">
      <i className="fa fa-check-circle" aria-hidden="true"></i><strong>{props.place.type}</strong><br/>
      Address: {props.place.location.address}
    </div>
  )
}

export default PlacesEndpointTile
