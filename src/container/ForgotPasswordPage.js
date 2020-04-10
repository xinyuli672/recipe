import React, {Component} from 'react'
import validator from 'email-validator'
 

import { Link } from 'react-router-dom'
import { Container, Box, Hero, Title, Input, Button, Notification } from 'reactbulma'

import './onboard.css'
import {userActions} from '../actions'

class ForgotPasswordPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      notify: false,
      notify_text: '',
      email: ''
    }
    this.handleLogin = this.handleLogin.bind(this)
  }

  updateEmail = (e) => {
    this.setState({
      email: e.target.value
    })
  }

    keyDown = (e) => {
      if (e.keyCode === 13) {
        this.handleLogin()
      }
    }

    handleLogin() {
      if (validator.validate(this.state.email)) {
        this.props.history.push('/forgot-confirm')
      } else {
        this.setState(state => ({
          notify: true,
          notify_text: `${this.state.email || 'Emptiness'} is not a valid email address.`
        }))    
      }
    }

    render() {
      return (
        <div>
          <div style={{marginTop: '1em'}} className="center">
            <Link to="/">Go to Homepage</Link>
          </div>

          <Container onKeyDown={this.keyDown} fluid id="primary-container">
            <Box>
              <Hero>
                <Hero.Body>
                  <Title className="center">
                Forgot Password
                  </Title>
                </Hero.Body>
              </Hero>

              <div className="notify spacing-base">
                {this.state.notify ? 
                  <Notification warning id="notify">{this.state.notify_text || ''}</Notification>: 
                  ''}
              </div>

              <div className="spacing-base">
                <label className="bold" htmlFor="medium">Enter your email</label>
                <Input medium onChange={this.updateEmail} id="medium"/>
              </div>

              <Button onClick={this.handleLogin}>Forgot Password</Button>
            </Box>
          </Container>
        </div>
      )
    }
}

export default ForgotPasswordPage
