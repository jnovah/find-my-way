export toggleTrips(index) {
  return { type: TOGGLE_TRIPS, index }
}

export setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter }
}

export function fetchTripsHasErrored(bool) {
  return {
    type: FETCH_TRIPS,
    hasErrored: bool
    status: 'error',
    error: 'An error has occurred'
  }
}

export function fetchTripsIsLoading(bool) {
  return {
    type: FETCH_TRIPS,
    isLoading: bool
  }
}

export function fetchTripsDataSuccess(trips) {
  return {
    type: FETCH_TRIPS,
    status: 'success'
    trips
  }
}
