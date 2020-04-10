import React, {Component} from 'react'
import Recipe from '../recipe/Recipe'
import { connect } from 'react-redux'
import { Header } from '../common'

import { recipeActions } from '../actions'
import './RecipePage.scss'

class RecipePage extends Component {
  constructor(props) {
    super(props)
    const { recipeId } = props.match.params
    this.state = {
      recipeId
    }

    this.props.dispatch(recipeActions.getRecipe(recipeId))
  }

  render() {
    const { recipe } = this.props

    return (
      <div> 
        <Header />
        <div className="main recipe-container">
          {recipe.hasRecipe &&
          <Recipe recipe={recipe.recipe}/>
          }
          {!recipe.hasRecipe &&
          <div>Loading...</div>
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { recipe } = state
  return {
    recipe
  }
}

export default connect(mapStateToProps)(RecipePage)