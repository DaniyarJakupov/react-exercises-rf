import "./index.css";
import React, { Component } from "react";
import subscribeToMessages from "./messages";
import FadeIn from "./FadeIn";

class PinScrollToBottom extends Component {
  componentWillUpdate() {
    let { scrollHeight, clientHeight, scrollTop } = document.documentElement;
    let sum = Math.ceil(scrollTop + clientHeight);
    console.log(scrollHeight, sum);
    this.manualScrolling = scrollHeight > sum;
  }

  componentDidMount() {
    this.scroll();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.manualScrolling) {
      this.scroll();
    }
  }

  scroll() {
    window.scrollTo(0, document.documentElement.scrollHeight);
  }

  render() {
    return this.props.children;
  }
}

class App extends Component {
  state = {
    messages: []
  };

  componentDidMount() {
    subscribeToMessages(message => {
      this.setState({
        messages: this.state.messages.concat([message])
      });
    });
  }

  render() {
    const { messages } = this.state;
    return (
      <div className="app">
        <div className="link">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.youtube.com/watch?v=VKHFZBUTA4k&list=RDVKHFZBUTA4k"
          >
            Sketch on YouTube
          </a>
        </div>
        <PinScrollToBottom>
          <ol className="messages">
            {messages.map((message, index) => (
              <FadeIn key={index}>
                <li className="message">
                  <div
                    className="avatar"
                    style={{ backgroundImage: `url(${message.avatar})` }}
                  />
                  <div className="text">{message.text}</div>
                </li>
              </FadeIn>
            ))}
          </ol>
        </PinScrollToBottom>
      </div>
    );
  }
}

export default App;
