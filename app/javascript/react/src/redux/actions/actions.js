import * as types from './actionTypes'

export toggleTrips(index) {
  return { type: TOGGLE_TRIPS, index }
}

export setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter }
}

export function fetchItemsHasErrored(bool) {
  return {
    type: FETCH_ITEMS,
    hasErrored: bool
    status: 'error',
    error: 'An error has occurred'
  }
}

export function fetchItemsIsLoading(bool) {
  return {
    type: FETCH_ITEMS,
    isLoading: bool
  }
}

export function fetchItemsDataSuccess(trips) {
  return {
    type: FETCH_ITEMS,
    status: 'success'
    trips
  }
}

export function errorAfterFiveSeconds() {
  return(dispatch) => {
    setTimeout(() => {
      dispatch(itemsHasErrored(true))
    }, 5000)
  }
}

export function itemsFetchData(url) {
  return(dispatch) => {
    dispatch(itemsIsLoading(true))

    fetch(url)
    .then((response) => {
      dispatch(fetchItemsIsLoading(false))
      return response
    })
    .then(response => response.json())
    .then(items => dispatch(fetchItemsDataSuccess(items)))
    .catch(() => dispatch(fetchItemsHasErrored(true)))
  }
}
