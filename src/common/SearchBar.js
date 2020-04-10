// PROPS 
// size = "expanded" or "narrow"

import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { queryActions, recipeActions } from '../actions'
import { connect } from 'react-redux'

import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './SearchBar.scss'

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = { searchTerm: 'Unchanged' }
    // this.submitSearch = this.submitSearch.bind(this)
    this.onKeyPress = this.onKeyPress.bind(this)
  }

  updateSearchTerm(e) {
    const searchTerm = e.target.value
    this.props.dispatch(queryActions.query(searchTerm))
  }

  submitSearch() {
    const { query } = this.props
    const word = query.word || ''
    this.props.history.push('/recipes')
    this.props.dispatch(recipeActions.getRecipes({ word, start: 0, count: 12 }))
  }

  onKeyPress(e) {
    if (e.keyCode === 13) {
      this.submitSearch()
    }
  }
  
  render() {
    const { query } = this.props
    return (
      <div className="search-bar field has-addons">
        <div className="search-button control">
          <a className="button is-info" onClick={() => this.submitSearch()}>
            <FontAwesomeIcon icon={faSearch} />
          </a>
        </div>
        <div className={this.props.size === 'expanded' ? 'control is-expanded' : 'control is-narrow'}>
          <input 
            className="search-field input" 
            onKeyDown={this.onKeyPress}
            type="search" onChange={(e) => this.updateSearchTerm(e)} 
            placeholder="Recipe Name or Ingredients"
            value={query.word}
          ></input>
        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  const { recipe, query } = state
  return {
    recipe,
    query
  }
}

export default withRouter(connect(mapStateToProps)(SearchBar))
// export default SearchBar;