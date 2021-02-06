import React from "react";
import ReactDOM from "react-dom";
import "./index.css";







let myvar = "";
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      timeLeft: 25 * 60,
      timeGoes: false,
      Session: true,
      SessionBreak: "Session",
    };
    this.handleDecrementBreak = this.handleDecrementBreak.bind(this);
    this.handleDecrementSession = this.handleDecrementSession.bind(this);
    this.handleIncrementBreak = this.handleIncrementBreak.bind(this);
    this.handleIncrementSession = this.handleIncrementSession.bind(this);
    this.timer = this.timer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.numberToTimeFormat = this.numberToTimeFormat.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  handleDecrementBreak = () => {
    if (this.state.breakLength > 1 && this.state.breakLength < 60) {
      this.setState({
        breakLength: this.state.breakLength - 1,
      });
      if (this.state.session) {
        this.setState({
          timeLeft: this.state.breakLength * 60 - 60,
        });
      }
    }
  };
  handleIncrementBreak = () => {
    if (this.state.breakLength >= 1 && this.state.breakLength < 60) {
      this.setState({
        breakLength: this.state.breakLength + 1,
      });
      if (this.state.session) {
        this.setState({
          timeLeft: this.state.breakLength * 60 + 60,
        });
      }
    }
  };
  handleDecrementSession = () => {
    if (this.state.sessionLength > 1 && this.state.sessionLength < 60) {
      this.setState({
        sessionLength: this.state.sessionLength - 1,
      });

      if (!this.state.session) {
        this.setState({
          timeLeft: this.state.sessionLength * 60 - 60,
        });
      }
    }
  };
  handleIncrementSession = () => {
    if (this.state.sessionLength > 1 && this.state.sessionLength < 60) {
      this.setState({
        sessionLength: this.state.sessionLength + 1,
      });
      if (!this.state.session) {
        this.setState({
          timeLeft: this.state.sessionLength * 60 + 60,
        });
      }
    }
  };

  handleReset = () => {
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      timeLeft: 25 * 60,
      timeGoes: false,
      SessionBreak: "Session",
    });
    clearInterval(myvar);
    document.getElementById("beep").load();
  };

  changeSession = () => {
    if (this.state.Session) {
      this.setState({
        Session: false,
        timeGoes: false,
        timeLeft: this.state.breakLength * 60,
        SessionBreak: "Break",
      });
      console.log(this.state.timeLeft, this.state.breakLength);
      clearInterval(myvar);
      this.timer();
      document.getElementById("beep").play();
    } else {
      this.setState({
        Session: true,
        timeGoes: false,
        timeLeft: this.state.sessionLength * 60,
        SessionBreak: "session",
      });
      clearInterval(myvar);
      this.timer();
      document.getElementById("beep").play();
    }
  };

  timer = () => {
    if (!this.state.timeGoes) {
      myvar = setInterval(() => {
        this.setState({
          timeLeft: this.state.timeLeft - 1,
          timeGoes: true,
        });

        if (this.state.timeLeft < 0) {
          this.changeSession();
        }
      }, 1000);
    } else {
      clearInterval(myvar);
      this.setState({
        timeGoes: false,
      });
    }
  };

  stopTimer = () => {
    clearInterval(myvar);
  };

  numberToTimeFormat = (num) => {
    let minute = Math.floor(num / 60);
    let minuteStr = minute < 10 ? "0" + minute.toString() : minute.toString();
    let second = num % 60;
    let secondStr = second < 10 ? "0" + second.toString() : second.toString();
    return minuteStr + ":" + secondStr;
  };

  render() {
    return (
      <div id="conatainer">
        <div id="break">
          <div id="break-label">Break Length</div>
          <div id="break-container">
          <div id="break-increment" onClick={this.handleIncrementBreak} className="up-down">
            up
          </div>
          <div id="break-length">{this.state.breakLength}</div>
          <div id="break-decrement" onClick={this.handleDecrementBreak}  className="up-down">
            down
          </div>
          </div>
        </div>

        <div id="session">
          <div id="session-label">Session Length</div>
          <div id="session-container">
          <div id="session-increment" onClick={this.handleIncrementSession} className="up-down">
            up
          </div>
          <div id="session-length" >{this.state.sessionLength}</div>
          <div id="session-decrement" onClick={this.handleDecrementSession} className="up-down">
            down
          </div>
          </div>
        </div>

        <div id="timer">
          <h1 id="timer-label">{this.state.SessionBreak}</h1>
          <div id="time-left">
            {this.numberToTimeFormat(this.state.timeLeft)}
          </div>
        </div>

        <div id="pause-reset">
          <div id="start_stop" onClick={this.timer}>
            start
          </div>
          <div id="reset" onClick={this.handleReset}>
            reset
          </div>
          <audio
            src="https://freesound.org/data/previews/182/182474_3153523-lq.mp3"
            id="beep"
          ></audio>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Clock />, document.getElementById("root"));
