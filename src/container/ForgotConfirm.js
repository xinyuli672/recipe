/* eslint-disable linebreak-style,indent */
import React, {Component} from 'react'
import './onboard.css'
import { Link } from 'react-router-dom'
import { Container, Box, Hero, Title, Input, Button, Notification, SubTitle } from 'reactbulma'
import RegistrationConfirmationPage from './RegistrationConfirmationPage'


class ForgotConfirm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            notify: false
        }
        this.handleConfirmation = this.handleConfirmation.bind(this)
    }

    handleConfirmation() {
        this.props.history.push('/')
    }

    render() {
        return (
            <Container fluid id="primary-container" >

                <div class= "has-text-centered">
                    <h1 className= "title is-spaced center">
                        Account Recovery
                    </h1>
                </div>

                <div class="subtitle is -3 has-text-centered">
                    <SubTitle/>
                    An email has been sent to your email with a link to reset your password. If you have not received the
                    email after a few minutes, please check you spam folder or re-enter your email
                    <a className="has-text-link" href = "/reset"> here</a>
                    <SubTitle/>
                </div>

                <div className="notify spacing-base">
                    {this.state.notify ?
                        <Notification warning id="notify">Kappa</Notification>:
                        ''}
                </div>
                <div class = "has-text-centered">
                    <Button id="center" onClick={this.handleConfirmation}>Yum!</Button>
                </div>
            </Container>
        )
    }
}
export default ForgotConfirm