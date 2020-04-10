import { userService } from '../service'
import { userConstants } from '../_constants'
import { faTable } from '@fortawesome/free-solid-svg-icons'

export const userActions = {
  userLogin,
  userRegister,
}

function userLogin(data) {
  // Do things

  data.authstring = btoa(data.username + ':' + data.password)
    
  // console.log('logging in with username ', data.username);
  // console.log('logging in with password ', data.password);
  // console.log('logging in with authstring ', data.authstring);

  return dispatch => {
    dispatch(request(data))
    userService.login(data)
      .then(statuscode => {
        console.log('Recieved status code from login of ', statuscode)
        if (statuscode == 200) {
          // console.log('dispatching login success');
          localStorage.setItem('loggedIn','true')
          localStorage.setItem('username', data.username)
          localStorage.setItem('authstring', data.authstring)
          console.log('set localstorage login of ', data.username)
          dispatch(success(data))
        }
        else if (statuscode == 401) {
          // console.log('dispatching login failure')
          dispatch(failure(data))
        }
      })
      .catch(error => {
        // console.log("Error logging in, dispatching error, error is ", error);
        dispatch(failure(data))
      })
  }

  // Question: Below what are we returning as far as a datatype? It looks like an object but it doesn't have the key: val format and also has the type: keyword. ??
  function request(data) { return { type: userConstants.LOGIN_REQUEST, data } }
  function success(data) { return { type: userConstants.LOGIN_SUCCESS, data } }
  function failure(data) { return { type: userConstants.LOGIN_FAILURE, data } }
}

function userRegister(data) {
  // Do things

  return dispatch => {
    dispatch(request(data))
    userService.register(data)
      .then(res => { // TODO change
        console.log('Recieved status code from login of ', res.status)
        if (res.status == 200) {
          // console.log('dispatching login success');
          dispatch(success(data))
        }
        else if (res.status == 400) {
          // console.log('dispatching login failure')
          data.registerError = 'Username or Email already exists'
          dispatch(failure(data))
        }
      })
      .catch(error => {
        console.log('Error registering in, dispatching error, error is ', error)
        dispatch(failure(data))
      })
  }

  function request(data) { return { type: userConstants.REGISTER_REQUEST, data } }
  function success(data) { return { type: userConstants.REGISTER_SUCCESS, data } }
  function failure(data) { return { type: userConstants.REGISTER_FAILURE, data } }
}