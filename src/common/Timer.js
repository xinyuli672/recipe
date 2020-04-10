// Written by Tony
// Requires prop "time"
// Note that time vars are in seconds

import React, {Component} from 'react'

export default class Timer extends React.Component {
  constructor(props) {
    super(props)
    
    this.startTime = props.time
    this.timer = 0

    this.state = {
      timeLeft: this.startTime
    }

    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
    this.countDown = this.countDown.bind(this)
    this.getHr = this.getHr.bind(this)
    this.getMin = this.getMin.bind(this)
    this.getSec = this.getSec.bind(this)
  }

  startTimer() {
    if (this.timer == 0 && this.state.timeLeft > 0) {
      this.timer = setInterval(this.countDown, 1000)
    }
  }

  stopTimer() {
    clearInterval(this.timer)
    this.timer = 0
  }
  
  countDown() {
    this.setState({
      timeLeft: this.state.timeLeft - 1
    })
    
    if (this.state.timeLeft == 0) {
      this.stopTimer()
    }
  }

  getHr(time) {
    let hr = Math.floor(this.state.timeLeft / 3600)
    return (hr < 10) ? '0' + hr.toString() : hr.toString()
  }

  getMin(time) {
    let min = Math.floor((this.state.timeLeft % 3600) / 60)
    return (min < 10) ? '0' + min.toString() : min.toString()
  }

  getSec(time) {
    let sec = this.state.timeLeft % 60
    return (sec < 10) ? '0' + sec.toString() : sec.toString()
  }

  render() {
    return (
      <div>
        <h1>{this.getHr(this.state.timeLeft)}:{this.getMin(this.state.timeLeft)}:{this.getSec(this.state.timeLeft)}</h1>
        <button onClick={this.startTimer}>Start</button>
        <button onClick={this.stopTimer}>Stop</button>
      </div>
    )
  }
}

Timer.defaultProps = {
  time: 600
}