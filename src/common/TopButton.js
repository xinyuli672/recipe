import React, { Component } from 'react'
import './TopButton.css'

class TopButton extends React.Component {
  scrollToTop () {
    window.scrollTo(0, 0)
  }
  render() {
    return (
      <button title='Back to top' className='scroll' onClick={ () => { this.scrollToTop() }}>
        <div className='arrow-up'></div>
      </button>
    )
  }
}

export default TopButton
