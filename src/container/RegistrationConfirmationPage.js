/* eslint-disable linebreak-style,indent */
import React, {Component} from 'react'
import './onboard.css'
import { Link } from 'react-router-dom'
import { Container, Box, Hero, Title, Input, Button, Notification, SubTitle } from 'reactbulma'


class RegistrationConfirmationPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            notify: false
        }
        this.handleConfirmation = this.handleConfirmation.bind(this)
    }

    handleConfirmation() {
        this.setState(state => ({
            notify: !state.notify
        }))
        setTimeout(() => {
            this.setState(state => ({
                notify: false
            }))
        }, 1000)
    }

    render() {
        return (
            <Container fluid id="primary-container" >

                    <div class= "has-text-centered">
                        <h1 className= "title is-spaced center">
                            Thank you for registering. Please verify your account.
                        </h1>
                    </div>

                    <div class="subtitle is -3 has-text-centered">
                        <SubTitle/>
                        In order to use Yummy, you must verify your account. An email has been sent to your email
                        with a link to verify your account. If you have not received the email after a few minutes,
                        please check you spam folder or
                        <a href = "****"> re-send the verification email.</a>
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

export default RegistrationConfirmationPage
/*<Hero>
                        <Hero.Body>
                            <Title>
                                Thank you for Registering. Please verify your account.
                            </Title>

                            <SubTitle/>
                            In order to use Yummy, you must verify your account. An email has been sent to your email
                            with a link to verify your account. If you have not received the email after a few minutes,
                            please check you spam folder or re-send the verification email.
                            <SubTitle/>

                        </Hero.Body>
                    </Hero>
                    */