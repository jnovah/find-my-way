import React, { Component } from 'react'
import { Route, NavLink, Switch } from 'react-router-dom'
import FormField from '../../components/FormField'

class NewTripFormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      className: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    let name = event.target.name
    this.setState({ [name]: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()
    let formPayLoad
    if(this.state.title !== '' || this.state.title !== ' ') {
      formPayLoad = {
        title: this.state.title,
        description: this.state.description,
        user_id: 1,
        status: 'planning'
      }
    }
    this.props.addNewTrip(formPayLoad)
  }

  render() {
    return(
      <div className={`small-8 medium-12 column trip-form ${this.state.className}`}>
        <form onSubmit={this.handleSubmit}>
          <FormField
            key='title'
            type='text'
            label='Give your trip a name'
            name='title'
            value={this.state.title}
            handleChange={this.handleChange}
          />
          <br/>
          <FormField
            key='description'
            className='trip-description'
            type='text'
            label=''
            name='description'
            value={this.state.description}
            handleChange={this.handleChange}
          />
          <br/>
          <input className="btn btn-2 btn-2d submit-button" type='submit' value='Continue' />
        </form>
      </div>
    )
  }
}

export default NewTripFormContainer
