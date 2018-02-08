import { TOGGLE_TRIP, FETCH_TRIP, FETCH_TRIP_SUCCESS, HAS_LEGS, COMPLETED_TRIP, NEW_TRIP_FORM, TRIP_FORM_COMPLETE } from '../actions/tripShow'
import { SET_TRIP_SHOW, SET_SAVED_PLACE } from '../../tripForm/actions/submitForms'
import { SET_TEXT_VALUE } from '../../tripForm/actions/setValue'

let initialState = {
  currentTrip: null,
  isFetching: false,
  title: "",
  description: "",
  origin: {},
  final: {},
  stops: [],
  directions: [],
  mapBounds: {},
  hasLegs: false,
  completed: false,
  planning: false,
  en_route: false,
  completed: false,
  legs: [],
  class: '',
  tripForm: false,
}

const trip = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_TRIP:
      return Object.assign({}, state, { currentTrip: action.id })
    case FETCH_TRIP:
      return Object.assign({}, state, { isFetching: true })
    case HAS_LEGS:
      return Object.assign({}, state, {
        directions: action.directions,
        hasLegs: true
      })
    case COMPLETED_TRIP:
      return Object.assign({}, state, {
        completed: true,
        class: 'hidden'
      })
    case FETCH_TRIP_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        currentTrip: action.trip.id,
        title: action.trip.title,
        description: action.trip.description,
        hasLegs: action.trip.has_legs,
        completed: action.trip.completed,
        en_route: action.trip.en_route,
        planning: action.trip.planning,
        mapBounds: action.trip.bounds,
        origin: Object.assign({}, state.origin, action.trip.origin),
        final: Object.assign({}, state.final, action.trip.final),
        stops: action.trip.stops,
        legs: action.trip.legs
      })
    case NEW_TRIP_FORM:
      return Object.assign({}, state, initialState, { tripForm: true })
    case TRIP_FORM_COMPLETE:
      return Object.assign({}, state, { tripForm: false })
    case SET_TRIP_SHOW:
      return Object.assign({}, state, {
        currentTrip: action.trip.id,
        planning: action.trip.planning
      })
      case SET_TEXT_VALUE:
        return Object.assign({}, state, { [action.inputType]: action.value })
      case SET_SAVED_PLACE:
        switch (action.placeType) {
          case 'show':
            return Object.assign({}, state, { stops: [...state.stops, action.place.stop] })
          default:
            return Object.assign({}, state, { [action.placeType]: action.place })
        }
    default:
      return state
  }
}

export default trip
