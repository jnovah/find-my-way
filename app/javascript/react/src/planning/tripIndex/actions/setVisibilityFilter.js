export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'
export const SHOW_ALL = 'SHOW_ALL'
export const SHOW_COMPLETED = 'SHOW_COMPLETED'
export const SHOW_IN_PLANNING = 'SHOW_IN_PLANNING'


let showAll = trips => {
  return {
    type: SHOW_ALL,
    trips
  }
}

let sortPlanning = trips => {
  return {
    type: SHOW_IN_PLANNING,
    trips: trips.filter(trip => {
      if (trip.planning) {
        return trip
      }
    })
  }
}

let sortCompleted = trips => {
  return {
    type: SHOW_COMPLETED,
    trips: trips.filter(trip => {
      if (trip.completed && !trip.planning && !trip.en_route) {
        return trip
      }
    })
  }
}

let setVisibilityFilter = (filter, trips) => dispatch => {
  if (filter == SHOW_ALL) {
    dispatch(showAll(trips))
  } else if (filter == SHOW_COMPLETED){
    dispatch(sortCompleted(trips))
  } else if (filter == SHOW_IN_PLANNING) {
    dispatch(sortPlanning(trips))
  }
}

export {
  showAll,
  sortPlanning,
  sortCompleted,
  setVisibilityFilter
}
