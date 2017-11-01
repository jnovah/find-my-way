import React, { Component } from 'react'
import { Route, NavLink, Switch } from 'react-router-dom'
import FormField from '../../components/FormField'

class NewTripFormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    let name = event.target.name
    let changeState = this.state[event.target.name]
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
      <div>
        <form onSubmit={this.handleSubmit}>
          <FormField
            key='title'
            type='text'
            label='Give your trip a name:'
            name='title'
            value={this.state.title}
            handleChange={this.handleChange}
          />
          <br/>
          <FormField
            key='description'
            type='text'
            label='Describe where your are headed and why(optional):'
            name='description'
            value={this.state.description}
            handleChange={this.handleChange}
          />
          <br/>
          <input type='submit'name='Submit your trip!' />
        </form>
      </div>
    )
  }
}

export default NewTripFormContainer
