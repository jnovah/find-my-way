import React, { Component } from 'react'
import { Switch, Route, NavLink, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import NewTripForm from './containers/NewTripFormContainer'
import NewPlaceForm from './containers/NewPlacesContainer'
import TripShow from '../tripShow/containers/TripShowContainer'
import { newTripForm, tripFormComplete } from '../tripShow/actions/tripShow'
import { setPlaceForm } from './actions/submitForms'

const mapStateToProps = state => {
  return {
    formType: state.tripForm.formType,
    placeForm: state.tripForm.placeForm,
    currentTrip: state.trip.currentTrip
  }
}

const mapDispatchToProps = dispatch => {
  return {
    newTripForm: () => { dispatch(newTripForm()) },
    setPlaceForm: () => { dispatch(setPlaceForm()) },
    tripFormComplete: () => { dispatch(tripFormComplete()) }
  }
}

class NewTripContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.newTripForm()
    this.props.formType === 'trip' ? this.props.history.push('/trips/newtrip/') : null
  }

  componentDidUpdate(prevProps) {
    switch (this.props.formType) {
      case 'origin':
        if (!prevProps.placeForm) {
          this.props.setPlaceForm()
          this.props.history.push(`${this.props.match.path}${this.props.formType}/`)
        }
      break
      case 'final':
        prevProps.formType !== 'final' ? this.props.history.push(`${this.props.match.path}${this.props.formType}/`) : null
      break
      case 'show':
        this.props.history.push(`/show/${this.props.currentTrip}/`)
      break
      default:
        return null
    }
  }

  componentWillUnmount() {
    this.props.formType === 'show' ? this.props.tripFormComplete() : null
  }

  render() {
    return(
      <div>
        <Switch>
          <Route strict path={`${this.props.match.path}${this.props.formType}/`} component={NewPlaceForm} />
          <NewTripForm />
        </Switch>
        <TripShow/>
      </div>
    )
  }
}

const NewTrip = connect(mapStateToProps, mapDispatchToProps)(NewTripContainer)

export default NewTrip
