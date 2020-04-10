/* eslint-disable linebreak-style,indent */
import React, { Component } from 'react'
import validator from 'email-validator'

import { Link } from 'react-router-dom'
import { Container, Box, Hero, Title, Input, Button, Notification, Field } from 'reactbulma'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { userActions } from '../actions'
import './onboard.css'

class RegistrationPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            notify: false,
            notify_text: '',
            username: '',
            firstname: '',
            lastname: '',
            email: '',
            password1: '',
            password2: '',
            question: '',
            answer: '',
            passwords_match: false,
            allgood: false
        }
        this.handleNewAccount = this.handleNewAccount.bind(this)
        this.verify = this.verify.bind(this)
    }

    keyDown = (e) => {
      if (e.keyCode === 13) {
        this.handleNewAccount()
      }
    }

    //need to md5 hash the password
    handleNewAccount = () => {
        if (this.state.password1 != this.state.password2) {
            alert('Passwords must match')
            console.log('passwords dont match', this.state.password1, this.state.password2)

        }
        else if (this.state.question == '') {
            alert('Must provide a security question')
        }
        else if (this.state.answer == '') {
            alert('Must provide a security answer')
        }
        else if (this.state.question == '') {
            alert('Must provide a security question')
        }
        else if (this.state.username == '') {
            alert('Must provide a username')
        } 
        else if (this.state.email == '' || !validator.validate(this.state.email)) {
            alert('You must provide a valid email')
        }
        else if (this.state.question == '') {
            alert('Must provide a security question')
        }
        else if (this.state.password1 == '') {
            alert('Must provide a password')
        }
        else if (this.state.password2 == '') {
            alert('Must provide a password')
        }
        else {
            this.setState(state => ({
                notify_text: 'Submitting registration',
                notify: !state.notify
            }))
            setTimeout(() => {
                this.setState(state => ({
                    notify: false
                }))
            }, 1000)

            let registrationpackage = {
                username: this.state.username,
                password: this.state.password1,
                email: this.state.email,
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                question: this.state.question,
                answer: this.state.answer,

            }

            this.props.dispatch(userActions.userRegister(registrationpackage))
            window.scrollTo(0,0)
            // This is a one off event, sue me for not using redux! :P
            // will: you're getting sued. on a side note, please add me on linkedin
            // Actively looking for a job
            // https://www.linkedin.com/in/imwillx/
            // You may find references of my code by looking into the /recipe folder.

        }
    }

    // This is broken... try filling everything out correctly, and then delete a whole Field besides password. You will see the button remains active 
    verify() {
        this.forceUpdate()
        let myallgood = this.state.email != '' && this.state.firstname != '' && this.state.lastname != '' && this.state.password1 != '' && this.state.password2 != '' && this.state.question != '' && this.state.answer != '' && this.state.username != '' && this.state.passwords_match
        this.setState({ allgood: myallgood })
    }


    updateUsername(e) {
        const myusername = e.target.value
        this.setState({ username: myusername })
        this.verify()

    }

    updateFirstName(e) {
        const firstName = e.target.value
        this.setState({ firstname: firstName })
        this.verify()
    }

    updateLastName(e) {
        const lastName = e.target.value
        this.setState({ lastname: lastName })
        this.verify()

    }
    updateEmail = (e) => {
        const myemail = e.target.value
        this.setState({ email: myemail })
        this.verify()
    }
    updatePassword1(e) {
        const mypassword1 = e.target.value
        this.setState({ password1: mypassword1 })

        if (this.state.password2 == mypassword1) {
            this.setState({ passwords_match: true, notify: false })
        }

        else {
            this.setState({ passwords_match: false, notify: true, notify_text: 'Passwords must match' })
        }
        this.verify()

    }
    updatePassword2(e) {
        const mypassword2 = e.target.value
        this.setState({ password2: mypassword2 })
        if (this.state.password1 == mypassword2) {
            this.setState({ passwords_match: true, notify: false })
        }
        else {
            this.setState({ passwords_match: false, notify: true, notify_text: 'Passwords must match' })
        }
        this.verify()

    }
    updateQuestion(e) {
        const myquestion = e.target.value
        this.setState({ question: myquestion })
        this.verify()

    }
    updateAnswer(e) {
        const myanswer = e.target.value
        this.setState({ answer: myanswer })
        this.verify()

    }


    render() {

        const { registered } = this.props.users
        if (registered) {
            this.props.history.push('/login')
            window.location.reload()
        } 
        let button = <Button primary onClick={this.handleNewAccount}>Make Account</Button>

        return (
            <div onKeyDown={this.keyDown}>
                <div style={{marginTop: '1em'}} className="center">
                    <Link to="/">Go to Homepage</Link>
                </div>

                <Container fluid id="primary-container">
                    <Box>
                        <Hero>
                            <Hero.Body>
                                <Title className="center">
                                    Create an Account
                                </Title>
                            </Hero.Body>
                        </Hero>

                        <div className="notify spacing-base">
                            {this.props.users.registerFailed ?
                                <Notification danger id="notify">{this.props.users.registerError}</Notification> :
                                ''}
                        </div>

                        <div className="spacing-base">
                            <label className="bold" htmlFor="medium">Username</label>
                            <Input onChange={(e) => this.updateUsername(e)} value={this.state.username} medium id="username" />
                        </div>

                        <div className="spacing-base">
                            <label className="bold" htmlFor="medium">First Name</label>
                            <Input onChange={(e) => this.updateFirstName(e)} value={this.state.firstname} medium id="firstname" />
                        </div>
                        <div className="spacing-base">
                            <label className="bold" htmlFor="medium">Last Name</label>
                            <Input onChange={(e) => this.updateLastName(e)} value={this.state.lastname} medium id="lastname" />
                        </div>
                        <div className="spacing-base">
                            <label className="bold" htmlFor="medium">Email Address</label>
                            <Input onChange={(e) => this.updateEmail(e)} value={this.state.email} medium id="email" />
                        </div>
                        <div className="spacing-base">
                            <label className="bold" htmlFor="medium">Password</label>
                            <Input onChange={(e) => this.updatePassword1(e)} value={this.state.password1} medium id="password1" type='password' />
                        </div>
                        <div className="spacing-base">
                            <label className="bold" htmlFor="medium">Password (Again)</label>
                            <Input onChange={(e) => this.updatePassword2(e)} value={this.state.password2} medium id="password2" type='password' />
                        </div>
                        <div className="spacing-base">
                            <label className="bold" htmlFor="medium">Security Question</label>
                            <Input onChange={(e) => this.updateQuestion(e)} value={this.state.question} medium id="question" />
                        </div>
                        <div className="spacing-base">
                            <label className="bold" htmlFor="medium">Security Answer</label>
                            <Input onChange={(e) => this.updateAnswer(e)} value={this.state.answer} medium id="answer" />
                        </div>
                        <div>
                            {button}

                        </div>
                        <div>
                            <br></br>
                            <Link to="/login" className="has-text-link float-right">Already have an account?</Link>
                        </div>

                    </Box>
                </Container>
            </div>

        )
    }
}

//export default RegistrationPage

function mapStateToProps(state) {
    const { users } = state
    return {
        users
    }
}
export default withRouter(connect(mapStateToProps)(RegistrationPage))
