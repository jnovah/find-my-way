import { INIT_MAP, DISPLAY_DIRECTIONS } from '../actions/renderDirections'

let initialState = {
  map: null,
  mapLoaded: false,
  directionsDisplay: false
}

const map = (state = initialState, action) => {
  switch (action.type) {
    case INIT_MAP:
      return Object.assign({}, state, {
        map: action.map,
        mapLoaded: true
      })
    case DISPLAY_DIRECTIONS:
      return Object.assign({}, state, {
        directionsDisplay: action.directionsObj
      })
    default:
      return state
  }
}

export default map
