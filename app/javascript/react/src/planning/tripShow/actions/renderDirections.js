export const MAP_LOADING = 'MAP_LOADING'
export const MAP_LOADED = 'MAP_LOADED'
export const INIT_MAP = 'INIT_MAP'
export const RENDER_DIRECTIONS = 'RENDER_DIRECTIONS'
export const DISPLAY_DIRECTIONS = 'DISPLAY_DIRECTIONS'

let mapLoading = () => {
  return {
    type: MAP_LOADING
  }
}

let mapLoaded = (map) => {
  return {
    type: MAP_LOADED,
    map
  }
}

let initMap = (origin) => {
  let coordinates = new google.maps.LatLng(Number(origin.lat), Number(origin.lng))
  return {
    type: INIT_MAP,
    map: new google.maps.Map(document.getElementById('directions-map'), {
      zoom: 8,
      center: coordinates
    })
  }
}

let displayDirections = directionsObj => {
  return{
    type: DISPLAY_DIRECTIONS,
    directionsObj
  }
}



let initDirectionsRenderer = (origin, dest) => dispatch => {
  let request = {
    origin: new google.maps.LatLng(Number(origin.lat), Number(origin.lng)),
    destination: new google.maps.LatLng(Number(dest.lat), Number(dest.lng)),
    travelMode: 'DRIVING'
  }
  let directionsService = new google.maps.DirectionsService()
  let directionsDisplay = new google.maps.DirectionsRenderer()
  directionsService.route(request, (results, status) => {
    if (status === 'OK') {
      directionsDisplay.setDirections(results)
      dispatch(displayDirections(directionsDisplay))
    }
  })
}

let pingGoogle = () => dispatch => {
  fetch('https://maps.googleapis.com/maps/api/js?key=AIzaSyBxgCBGkaioyQNgXAPVEiBfnz9IFeVfXws&v=3&callback=initMap', {
    mode: 'no-cors',
    headers: { 'Access-Control-Allow-Origin': 'http://localhost:3000'},
  })
}

export {
  pingGoogle,
  initMap,
  initDirectionsRenderer
}
