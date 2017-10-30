import React, { Component } from 'react'
import { Switch, Route, NavLink } from 'react-router-dom'
import FormField from '../FormField'
import Start from './Start'

class NewTrip extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      userId: '',
      newTrip: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleStateClear = this.handleStateClear.bind(this)
    this.addNewTrip = this.addNewTrip.bind(this)
    this.handleStateClear = this.handleStateClear.bind(this)
  }

  componentDidMount() {
    fetch('api/v1/users/user_id.json', {
      credentials: "same-origin",
      headers: {"Content-Type": "application/json"}})
    .then(response => response.json())
    .then(body => {
      this.setState({ userId: body })
    })
  }

  handleChange(event) {
    let name = event.target.name
    let changeState = this.state[event.target.name]
    this.setState({ [name]: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()
    let formPayLoad
    if (this.state.title !== '' || this.state.title !== ' ') {
      formPayLoad = {
        title: this.state.title,
        description: this.state.description,
        user_id: this.state.userId,
        status: 'planning'
      }
    }
    this.addNewTrip(formPayLoad)
  }

  addNewTrip(formPayLoad) {
    fetch('api/v1/locations/create_trip.json', {
      method: "POST",
      body: JSON.stringify(formPayLoad),
      credentials: "same-origin",
      headers: {"Content-Type": "application/json"}
    }) .then(response => response.json())
    .then(body => {
      this.setState({ trip: body.trip })
    })
  }

  handleStateClear() {
    this.setState({
      title: '',
      description: ''
    })
  }

  render() {
    return(
      <div>
        <Switch>
          <Route path='/new_trip/start' render={props => (<Start trip={this.state.newTrip} userId={this.state.userId} {...props} />)} />
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
            <br />
            <NavLink to='/new_trip/start'>
              <input type='submit'name='Submit your trip!' />
            </NavLink>
          </form>
        </Switch>
      </div>
    )
  }
}

export default NewTrip
