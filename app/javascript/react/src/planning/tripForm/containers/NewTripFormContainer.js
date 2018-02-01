import React, { Component } from 'react'
import { Route, NavLink, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import FormField from '../../../../sharedResources/constants/FormField'
import { setTextValue } from '../actions/setValue'
import { validateTripForm, saveTrip } from '../actions/submitForms'

const mapStateToProps = state => {
  return {
    title: state.trip.title,
    description: state.trip.description,
    valid: state.tripForm.tripFormValid,
    currentTrip: state.trip.currentTrip
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setTextValue: (inputType, value) => { dispatch(setTextValue(inputType, value)) },
    validateTripForm: (title, description) => { dispatch(validateTripForm(title, description)) },
    saveTrip: (payload, form) => { dispatch(saveTrip(payload, form)) }
  }
}

class NewTripFormContainer extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidUpdate() {
    this.props.validateTripForm(this.props.title, this.props.description)
  }

  handleChange(event) {
    this.props.setTextValue(event.target.name, event.target.value)
  }

  handleSubmit(event) {
    event.preventDefault()
    if (this.props.valid) {
      let payload = { title: this.props.title, description: this.props.description }
      this.props.saveTrip(payload, 'trip')
    }
  }

  render() {
    return(
      <div className={`small-8 medium-12 column trip-form`}>
        <form onSubmit={this.handleSubmit}>
          <FormField
            key='title'
            type='text'
            label='Give your trip a name'
            name='title'
            value={this.props.title}
            handleChange={this.handleChange}
          />
          <br/>
          <FormField
            key='description'
            className='trip-description'
            type='text'
            label='All the best trips start with a story'
            name='description'
            value={this.props.description}
            handleChange={this.handleChange}
          />
          <br/>
          <input type='submit' value='Save & Continue' />
        </form>
      </div>
    )
  }
}

const NewTripForm = connect(mapStateToProps, mapDispatchToProps)(NewTripFormContainer)

export default NewTripForm
