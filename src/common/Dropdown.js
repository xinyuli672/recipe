import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Dropdown.scss'

export default class Dropdown extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: this.props.title,
      items: this.props.items
    }
  }
    
  render() {
    const { title, items } = this.state
    const listItems = items && items.map((item, id) => {
      return <li key={id}><Link to={item.link}>{item.name}</Link></li>
    })

    return (
      <div className="dd">
        { title && <div className="category">{title}</div> }
        <ul>
          { listItems }
        </ul>
      </div>
    )
  }
}
