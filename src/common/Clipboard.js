import React, {Component} from 'react'

class Clipboard extends Component {

  constructor(props){
    super(props)
  }

  copy(){
    let div=document.getElementById('paste-box')
    let url = document.createElement('textarea')
    div.appendChild(url)
    url.value = window.location.href
    url.focus()
    url.select()
    document.execCommand('Copy')
    div.removeChild(url)
  }

  render() {
    return (
      <div id="paste-box">
        <button onClick={this.copy}>Share</button>
      </div>
    )
  }


}

export default Clipboard