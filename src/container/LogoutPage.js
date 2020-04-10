/* eslint-disable linebreak-style */
import React, { Component } from 'react'
import { Router } from 'react-router-dom'

import { userService } from '../service'

class LogoutPage extends Component {
  constructor(props) {
    super(props)
    userService.logout()
    this.props.history.push('/')
  }

  render() {
    return (
      <div></div>
    )
  }
}

export default LogoutPage 
