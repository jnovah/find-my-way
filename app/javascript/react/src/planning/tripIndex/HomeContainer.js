import React, { Component } from 'react'
import { NavLink, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import Index from './containers/IndexContainer'

import { setVisibilityFilter } from './actions/setVisibilityFilter'

const mapStateToProps = state => {
  return {
    visibilityFilter: state.trips.visibilityFilter,
    isFetching: state.trips.isFetching,
    trips: state.trips.trips,
    filteredTrips: state.trips.filteredTrips
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setVisibilityFilter: (filter, trips) => { dispatch(setVisibilityFilter(filter, trips)) }
  }
}

class HomeContainer extends Component {
  constructor(props) {
    super(props)
    this.toggleVisibilityFilter = this.toggleVisibilityFilter.bind(this)
  }

  toggleVisibilityFilter(event) {
    this.props.setVisibilityFilter(event.target.id, this.props.trips)
  }

  render() {
    return(
      <div className='index-container image'>
        <div className='trip-types'>
          <button onClick={this.toggleVisibilityFilter} id='SHOW_IN_PLANNING' className="btn btn-4 btn-4c add-new">Trips in Planning</button>
          <button onClick={this.toggleVisibilityFilter} id='SHOW_COMPLETED' className="btn btn-4 btn-4c add-new">Completed Trips</button>
          <button onClick={this.toggleVisibilityFilter} id='SHOW_ALL' className="btn btn-4 btn-4c add-new">All Trips</button>
        </div>
        <div>
          <Index />
        </div>
      </div>
    )
  }
}

const Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer)

export default Home
