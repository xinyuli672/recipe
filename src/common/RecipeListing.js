import React from 'react'
import ReactStars from 'react-stars'
import './RecipeListing.scss'
import { Link } from 'react-router-dom'

const RecipeListing = (props) => {
  return (
    <div className="recipe-box">
      <div className="card-image">
        <Link to={props.onClickUrl}>
          <div to={props.onClickUrl} style={ { backgroundImage: `url(${props.recipe.image[0]}` } }>
          </div>
        </Link>
        {/* <Link to={props.onClickUrl}><img src={props.recipe.image[0]} /></Link> */}
      </div>
      <div className="recipe-title">
        <Link to={props.onClickUrl}>{props.recipe.name}</Link>
      </div>
      <div>Posted by {props.recipe.author}</div>

      <div className="rating-wrap">
        <ReactStars count={5} value={props.recipe.aggregate_rating} edit={false} size={30} />
      </div>

    </div>
  )
}
export default RecipeListing