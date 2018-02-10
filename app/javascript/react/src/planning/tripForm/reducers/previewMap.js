import { INIT_PREVIEW_MAP, SET_MARKER, UPDATE_MARKER, REMOVE_MARKER, MARKER_UPDATING } from '../actions/getPreview'
import { SET_SAVED_PLACE } from '../actions/submitForms'

let initialState = {
  previewMap: null,
  marker: false,
  mapLoaded: false,
  updateOriginMarker: false,
  markerUpdating: false
}

const previewMap = (state = initialState, action) => {
  switch (action.type) {
    case INIT_PREVIEW_MAP:
      return Object.assign({}, state, {
        previewMap: action.previewMap,
        mapLoaded: true
      })
    case SET_MARKER:
      return Object.assign({}, state, {
        marker: action.marker,
        markerUpdating: false
      })
    case REMOVE_MARKER:
      return Object.assign({}, state, { marker: false })
    case MARKER_UPDATING:
      return Object.assign({}, state, { markerUpdating: true })
    case SET_SAVED_PLACE:
      return initialState
    default:
      return state
  }
}

export default previewMap
