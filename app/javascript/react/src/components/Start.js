import React, { Component } from 'react'
import { Route, NavLink, Switch } from 'react-router-dom'
import FormField from './FormField'

class Start extends Component {
  constructor(props) {
    super(props)
    this.state = {
      locationStart: '',
      locationEnd: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    debugger
    let stateKey = this.state[event.target.name]
    this.setState({ [stateKey]: event.target.value })
  }

  handleSubmit() {
    let formPayLoad = { start: this.state.locationStart, end: this.state.locationEnd }
    this.props.calculateBaseDistance(formPayLoad)
  }

  render() {
    console.log(this.state.locationStart);
    console.log(this.state.locationEnd);
    return(
      <Switch>
        <Route exact path='/start' render={props => (<StartingLocation onChange={this.handleChange} onSubmit={this.handleSubmit} value={this.state.locationStart} {...props}/>)} />
        <Route path='/start/finalLocation' render={props => (<FinalLocation onChange={this.handleChange} onSubmit={this.handleSubmit} value={this.state.locationEnd} {...props}/>)} />
      </Switch>
    )
  }
}

export default Start

const StartingLocation = props => {
  return(
    <form>
      <FormField
        key='location_start'
        type='text'
        label='Starting Location:'
        name='locationStart'
        value={props.value}
        handleChange={props.handleChange}
      />

      <NavLink to='/start/FinalLocation'>
        <input type='button' name='Enter Final Destination' />
      </NavLink>
    </form>
  )
}

const FinalLocation = props => {
  return(
    <form>
      <FormField
        key='location_end'
        type='text'
        label='Final Destination:'
        name='locationEnd'
        value={props.value}
        handleChange={props.handleChange}
      />
    </form>
  )
};

<script type="text/javascript" src={`https://maps.googleapis.com/maps/api/js?key=${process.env.google_maps_api_key}&libraries=places`}></script>
