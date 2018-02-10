import React from 'react'

const TripIndexTile = props => {
  return(
      <div className="index-tile small-12">
        <div className="trip-details">
          <div className="column small-6 align-self-middle trip-title"><strong>{props.trip.title}</strong></div>
          <div className="column small-6 trip-description">{props.trip.description}</div>
        </div>
        {/* <ul> */}
          {/* <div className="column small-12 locations origin"><strong>Origin: </strong>{props.trip.origin.address}</div> */}
          {/* <div className="column small-12 locations end"><strong>Final: </strong>{props.trip.end.address}</div> */}
        {/* </ul> */}
      </div>
  )
}

export default TripIndexTile
