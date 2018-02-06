import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

export const MAP_LOADING = 'MAP_LOADING'
export const MAP_LOADED = 'MAP_LOADED'
export const INIT_MAP = 'INIT_MAP'
export const SET_GEOCODE = 'SET_GEOCODE'
export const SET_PLACE_ID = 'SET_PLACE_ID'
export const SET_ORIGIN_MARKER = 'SET_ORIGIN_MARKER'
export const UPDATE_ORIGIN_MARKER = 'UPDATE_ORIGIN_MARKER'

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
  return {
    type: INIT_MAP,
    map: new google.maps.Map(document.getElementById('map'), {
      zoom: 8,
      center: origin
    })
  }
}

let setOriginMarker = (origin, address, map) => {
  return {
    type: SET_ORIGIN_MARKER,
    marker: new google.maps.Marker({
      position: origin,
      map: map,
      title: address
    })
  }
}

let updateOriginMarker = () => {
  return {
    type: UPDATE_ORIGIN_MARKER
  }
}

let setGeocode = (geocode) => {
  return {
    type: SET_GEOCODE,
    geocode
  }
}

let setPlaceId = (placeId, address) => {
  return {
    type: SET_PLACE_ID,
    placeId,
    address
  }
}

let getGeocode = (address) => dispatch => {
  return geocodeByAddress(address)
  .then(results => {
    dispatch(setPlaceId(results[0].place_id, address))
    return getLatLng(results[0])
  }) .then(latLng => {
    dispatch(setGeocode(latLng))
    dispatch(initMap(latLng))
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
  getGeocode,
  setOriginMarker,
  updateOriginMarker
}
