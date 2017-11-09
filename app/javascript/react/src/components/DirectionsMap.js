import React from 'react'
import { withGoogleMap, GoogleMap } from 'react-google-maps'

const DirectionsMap = props => {
  return(
    <GoogleMap>{<DirectionsRenderer directions={this.state.directions} />}</GoogleMap>
  )
}
