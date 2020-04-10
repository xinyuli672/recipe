import React, {Component} from 'react'
import _ from 'underscore'
import Recipe from '../recipe/Recipe'
import { connect } from 'react-redux'
import { Header, RecipeListing, TopButton } from '../common'

import { recipeActions, filterActions } from '../actions'
import './RecipesPage.scss'

let start, count
class RecipesPage extends Component {
  constructor(props) {
    super(props)
    this.resetCounter()
  }

  resetCounter = () => {
    start = 0
    count = 12
  }

  incrementCounter = () => {
    // start = count
    count = count + 12
  }

  componentWillMount() {
    const { recipes } = this.props
    if (!recipes.hasRecipes && !recipes.gettingRecipes) {
      this.props.dispatch(recipeActions.getRecipes({start, count}))
      this.incrementCounter()
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
    this.setState({
      listening: true
    })
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  // https://hashnode.com/post/how-to-get-scroll-position-in-reactjs-to-add-class-or-style-on-the-whole-page-cj0i3io6100c04o53hsxyxtjb
  handleScroll = (e) => {
    const totalHeight = this.container.clientHeight
    const viewPort = window.innerHeight
    let supportPageOffset = window.pageXOffset !== undefined
    let isCSS1Compat = ((document.compatMode || '') === 'CSS1Compat')
    let scroll = {
      x: supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft,
      y: supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop
    }

    const percent = (scroll.y) / (totalHeight-viewPort)
    if (percent > 0.8) {
      this.load()
    }
  };

  load = () => {
    const { query, recipes, filter } = this.props
    const word = query ? query.word : ''
    const filterWord = filter ? filter.filter : ''

    if (!recipes.gettingRecipes) {
      this.props.dispatch(recipeActions.getMoreRecipes({word, start, count, filter: filterWord }))
      this.incrementCounter()
    }
  }

  setFilter = (filter) => {    
    this.resetCounter()
    // We reset the search
    const { query } = this.props
    const word = query ? query.word : ''
    this.props.dispatch(filterActions.filter(filter))
    this.props.dispatch(recipeActions.getRecipes({word, filter, start, count}))
    // Increment for the next search
    this.incrementCounter()
  }

  render() {
    const { recipes } = this.props
    
    return (
      <div ref={ (container) => this.container = container } > 
        <Header />
        <TopButton />
        <div className="main filter-container">
          Filters:
          <div className="filters">
            <div onClick={() => this.setFilter('aggregate_rating')}>Aggregate Rating</div>
            <div onClick={() => this.setFilter('total_time')}>Total Time</div>
            <div onClick={() => this.setFilter('yield')}>Number of Servings</div>
          </div>
        </div>
        <div className="main recipe-container">
          {recipes.hasRecipes &&
            _.map(recipes.recipes, (recipe, id) => {
              const url = `recipes/${recipe.meal_id}`
              return <RecipeListing onClickUrl={url} key={id} recipe={recipe}/>
            })
          }
          {(!recipes.hasRecipes || recipes.gettingRecipes) &&
            <div>Loading...</div>
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { recipes, query, filter } = state
  return {
    recipes,
    query,
    filter
  }
}

export default connect(mapStateToProps)(RecipesPage)