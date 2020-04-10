/* eslint-disable linebreak-style */
import React, { Component } from 'react'
import './App.scss'
import { BrowserRouter as Router,
  Route,
  withRouter,
  Link,
  Switch } from 'react-router-dom'
import SearchBar from './common/SearchBar'

import { PrivateRoute } from './common'
import {
  HomePage,
  LoginPage,
  LogoutPage,
  ForgotPasswordPage,
  ForgotConfirmPage,
  RegistrationPage,
  RegistrationConfirmationPage,
  ProfilePage,
  RecipePage,
  RecipesPage,
  
} from './container'

import CreateRecipePage from './container/CreateRecipe'
//import Body from './common/Body'

const ConfigPage = () => <div><pre>{JSON.stringify(global.CONFIG, null, 2)}</pre></div>
const TodoPage = () => <div>Todo Page</div>
const NullPage = () => <div>404 Page</div>

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Router>
        <Switch>
          {/* Home */}
          <Route exact path="/" component={HomePage} />

          {/* View Recipes */}
          <Route exact path="/recipes" component={RecipesPage} />
          <Route exact path="/recipes/:recipeId" component={RecipePage} />

          {/* Submit Recipe: Protected */}
          <PrivateRoute exact path="/recipe/submit" isAuthed={true} component={RecipePage} />

          {/* Login/Register/Reset Password/Logout */}
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegistrationPage} />
          <Route exact path="/reset" component={ForgotPasswordPage} />
          <Route exact path="/forgot-confirm" component={ForgotConfirmPage} />
          <Route exact path="/logout" component={LogoutPage} />
          <Route exact path="/confirm" component={RegistrationConfirmationPage} />
          {/* Profile Page: Protected */}
          <Route exact path="/profile" component={ProfilePage} />
          <Route exact path="/createRecipe" component={CreateRecipePage} />
          {/* Handle 404 */}
          <Route exact path="/config" component={ConfigPage} />
          <Route component={NullPage} />
        </Switch>
      </Router>
    )
  }
}
/* If you're reading this, you've been in a coma for almost 20 years now. We're trying a new technique. We don't know where this message will end up in your dream, but we hope it works. Please wake up, we miss you.*/
export default App
