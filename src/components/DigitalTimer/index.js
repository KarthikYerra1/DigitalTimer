import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {
    isTimerRunning: false,
    timeInMinutes: 25,
    timeElapsedInSeconds: 0,
  }

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => {
    clearInterval(this.intervalId)
  }

  incrementTimeElapsedInSeconds = () => {
    const {timeInMinutes, timeElapsedInSeconds} = this.state
    const isTimerCompleted = timeElapsedInSeconds === timeInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    }
    this.setState(prevState => ({
      timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
    }))
  }

  onClickStartOrStopButton = () => {
    const {isTimerRunning, timeElapsedInSeconds, timeInMinutes} = this.state
    const isTimerCompleted = timeElapsedInSeconds === timeInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  onResetTimer = () => {
    this.setState({
      isTimerRunning: false,
      timeElapsedInSeconds: 0,
      timeInMinutes: 25,
    })
    this.clearTimerInterval()
  }

  decreaseTimer = () => {
    const {timeInMinutes} = this.state
    if (timeInMinutes > 1) {
      this.setState(prevState => ({
        timeInMinutes: prevState.timeInMinutes - 1,
      }))
    }
  }

  increaseTimer = () => {
    this.setState(prevState => ({
      timeInMinutes: prevState.timeInMinutes + 1,
    }))
  }

  timeFormat = () => {
    const {timeElapsedInSeconds, timeInMinutes} = this.state
    const totalRemainingSeconds = timeInMinutes * 60 - timeElapsedInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const minutesDisplay = minutes > 9 ? minutes : `0${minutes}`
    const secondsDisplay = seconds > 9 ? seconds : `0${seconds}`

    return `${minutesDisplay}:${secondsDisplay}`
  }

  render() {
    const {isTimerRunning, timeInMinutes, timeElapsedInSeconds} = this.state

    return (
      <div className="bg-container">
        <h1 className="timer-heading">Digital Timer</h1>
        <div className="timer-app-container">
          <div className="timer-container">
            <div className="time-display">
              <h1 className="timer">{this.timeFormat()}</h1>
              <p className="timer-status">
                {isTimerRunning ? 'Running' : 'Paused'}
              </p>
            </div>
          </div>
          <div className="control-container">
            <div className="start-reset-controller">
              <div className="control-button-container">
                <button
                  type="button"
                  className="btn"
                  onClick={this.onClickStartOrStopButton}
                >
                  <img
                    src={
                      isTimerRunning
                        ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
                        : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
                    }
                    alt={isTimerRunning ? 'pause icon' : 'play icon'}
                    className="button-image"
                  />
                  {isTimerRunning ? 'Pause' : 'Start'}
                </button>
              </div>
              <div className="control-button-container">
                <button
                  type="button"
                  className="btn"
                  onClick={this.onResetTimer}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    className="button-image"
                  />
                  Reset
                </button>
              </div>
            </div>
            <div className="minutes-input">
              <p className="timer-limit-text">Set Timer limit</p>
              <div className="volume-buttons-container">
                <button
                  className="volume-button"
                  type="button"
                  onClick={this.decreaseTimer}
                  disabled={timeElapsedInSeconds > 0}
                >
                  -
                </button>
                <div className="timer-min-container">
                  <p className="minutes-display">{timeInMinutes}</p>
                </div>
                <button
                  className="volume-button"
                  type="button"
                  onClick={this.increaseTimer}
                  disabled={timeElapsedInSeconds > 0}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
