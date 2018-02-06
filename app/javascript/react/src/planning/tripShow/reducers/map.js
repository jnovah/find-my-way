import { INIT_MAP, SET_ORIGIN_MARKER, UPDATE_ORIGIN_MARKER } from '../actions/getMap'

let initialState = {
  map: null,
  originMarker: false,
  mapLoaded: false,
  updateOriginMarker: false
}

const map = (state = initialState, action) => {
  switch (action.type) {
    case INIT_MAP:
      return Object.assign({}, state, {
        map: action.map,
        mapLoaded: true
      })
    case SET_ORIGIN_MARKER:
      return Object.assign({}, state, { originMarker: action.marker })
    case UPDATE_ORIGIN_MARKER:
      return Object.assign({}, state, { originMarker: false })
    default:
      return state
  }
}

export default map
