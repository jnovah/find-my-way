import React, { Component } from 'react'

class LegIndexTile extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.handleComplete(this.props.leg.leg.id)
  }

  render() {
    let className
    let current
    let completeButton
    let complete
    if (this.props.leg.leg.current) {
      className = 'current'
      current = <div className='current-text column small-12'>Current Leg</div>
      completeButton = <button className='depth' onClick={this.handleClick}>Leg Complete</button>
    } else if (this.props.leg.leg.complete) {
      complete = <div className='current-text column small-12'>Leg Complete</div>
    } else {
      className = ''
    }

    return(
      <div className={`leg-tile destination column small-12 end depth ${className}`}>
        <div>Leg: {this.props.leg.leg.order}</div>
        <div className='column small-6'>Starting Location:<br/> {this.props.leg.origin.address}</div>
        <div className='column small-6 index-text'>Final Destination:<br/> {this.props.leg.destination.address}</div>
        {current}
        {completeButton}
        {complete}
      </div>
    )
  }
}

export default LegIndexTile
