import React, { Component } from 'react'
import { Switch, Route, NavLink, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import NewTripForm from './containers/NewTripFormContainer'
import NewPlaceForm from './containers/NewPlacesContainer'
import TripShow from '../tripShow/containers/TripShowContainer'
import { newTripForm } from '../tripShow/actions/tripShow'
import { setPlaceForm } from './actions/submitForms'

const mapStateToProps = state => {
  return {
    formType: state.tripForm.formType,
    placeForm: state.tripForm.placeForm
  }
}

const mapDispatchToProps = dispatch => {
  return {
    newTripForm: () => { dispatch(newTripForm()) },
    setPlaceForm: () => { dispatch(setPlaceForm()) }
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

  componentDidUpdate() {
    if (this.props.formType == 'origin' && !this.props.placeForm) {
      this.props.setPlaceForm()
      this.props.history.push(`${this.props.match.path}${this.props.formType}/`)
    } else if (this.props.formType === 'final') {
      this.props.history.push(`${this.props.match.path}${this.props.formType}/`)
    }
  }

  componentWillUnmount() {
    this.props.history.push(`${this.props.match.path}`)
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
