import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

export const MAP_LOADED = 'MAP_LOADED'
export const INIT_PREVIEW_MAP = 'INIT_PREVIEW_MAP'
export const SET_GEOCODE = 'SET_GEOCODE'
export const SET_PLACE_ID = 'SET_PLACE_ID'
export const SET_MARKER = 'SET_MARKER'
export const REMOVE_MARKER = 'REMOVE_MARKER'
export const MARKER_UPDATING = 'MARKER_UPDATING'


let initPreviewMap = (coordinates) => {
  return {
    type: INIT_PREVIEW_MAP,
    previewMap: new google.maps.Map(document.getElementById('preview-map'), {
      zoom: 12,
      center: coordinates
    })
  }
}

let setMarker = (coordinates, address, map) => {
  return {
    type: SET_MARKER,
    marker: new google.maps.Marker({
      position: coordinates,
      map: map,
      title: address
    })
  }
}

let removerMarker = () => {
  return {
    type: REMOVE_MARKER
  }
}

let markerUpdating = () => {
  return {
    type: MARKER_UPDATING
  }
}

let updateMarker = (coordinates, address, map) => dispatch => {
  dispatch(removerMarker())
  dispatch(markerUpdating())
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

let getGeocode = (address, update = null) => dispatch => {
  return geocodeByAddress(address)
  .then(results => {
    dispatch(setPlaceId(results[0].place_id, address))
    return getLatLng(results[0])
  }) .then(latLng => {
    dispatch(setGeocode(latLng))
  })
}

let pingGoogle = () => dispatch => {
  fetch('https://maps.googleapis.com/maps/api/js?key=AIzaSyBxgCBGkaioyQNgXAPVEiBfnz9IFeVfXws&v=3&callback=initPreviewMap', {
    mode: 'no-cors',
    headers: { 'Access-Control-Allow-Origin': 'http://localhost:3000'},
  })
}

export {
  pingGoogle,
  getGeocode,
  setMarker,
  updateMarker,
  initPreviewMap
}
