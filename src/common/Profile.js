
import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { userService } from '../service'

import { faCaretDown, faCaretUp} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Dropdown } from './'
import './Profile.scss'

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      isLoggedIn: localStorage.loggedIn
    }

  }
  
  onHover = (event) => {
    this.setState({ isOpen: true })
  };
  
  onLeave = (event) => {
    this.setState({ isOpen: false })
  };

  //login, regsiter, 
  
  render() {
    const { isOpen, isLoggedIn } = this.state
    const settings = []
    if (isLoggedIn) {
      settings.push({ name: 'Profile', link: '/profile' })
      settings.push({ name: 'Logout', link: '/logout'})
    } else {
      settings.push({ name: 'Login', link: '/login' })
      settings.push({ name: 'Register', link: '/register' })
    }

    return (
      <div className="profile" onMouseLeave={this.onLeave}>
        <div onMouseEnter={this.onHover} to={ isLoggedIn ? '/profile' : '/login'}>
          <div className="profile-text">hi {localStorage.getItem('username') || ''}</div>
          {
            isOpen ? 
              <FontAwesomeIcon icon={faCaretUp} /> :
              <FontAwesomeIcon icon={faCaretDown} />
          }
        </div>
        {
          isOpen && <Dropdown items={settings} />
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { users } = state
  return {
    users
  }
}

export default connect(mapStateToProps)(Profile)
