import React, { Component } from 'react'
import { Switch, Route, NavLink, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import NewTripForm from './containers/NewTripFormContainer'
import NewPlacesContainer from './containers/NewPlacesContainer'
import TripShow from '../tripShow/containers/TripShowContainer'
import { newTripForm } from '../tripShow/actions/tripShow'

const mapStateToProps = state => {
  return {

  }
}

const mapDispatchToProps = dispatch => {
  return {
    newTripForm: () => { dispatch(newTripForm()) }
  }
}

class NewTripContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.newTripForm()
  }

  componentWillUnmount() {
    this.props.history.push(`${this.props.match.path}`)
  }


  render() {
    return(
      <div>
        <NewTripForm />
        <TripShow/>
      </div>
    )
  }
}

const NewTrip = connect(mapStateToProps, mapDispatchToProps)(NewTripContainer)

export default NewTrip
