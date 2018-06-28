////////////////////////////////////////////////////////////////////////////////
import React from "react";
import { createBrowserHistory } from "history";
import * as PropTypes from "prop-types";

/*
* create a new history instance
history = createBrowserHistory()

* read the current URL
history.location

* listen for changes to the URL
const unsubscribe = history.listen(() => {
  history.location // is now different
})

* change the URL
history.push('/something')
*/

class Router extends React.Component {
  /*============== Create history context  =============*/
  history = createBrowserHistory();

  static childContextTypes = {
    history: PropTypes.object.isRequired
  };

  getChildContext() {
    return {
      history: this.history
    };
  }
  /* ================================================== */

  componentDidMount() {
    this.unsubscribe = this.history.listen(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return this.props.children;
  }
}

class Route extends React.Component {
  // Get access to history context
  static contextTypes = {
    history: PropTypes.object.isRequired
  };

  // Render correct component based on provided props
  render() {
    const { path, render, component: Component, exact } = this.props;
    const { location } = this.context.history;
    const match = exact
      ? location.pathname === path
      : location.pathname.startsWith(path);

    if (match) {
      if (render) {
        // render prop pattern
        return render();
      } else if (Component) {
        // component prop
        return <Component />;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
}

class Link extends React.Component {
  // Get access to history context
  static contextTypes = {
    history: PropTypes.object.isRequired
  };

  handleClick = e => {
    e.preventDefault();
    // Change url address inside the browser
    this.context.history.push(this.props.to);
  };

  render() {
    return (
      <a href={`${this.props.to}`} onClick={this.handleClick}>
        {this.props.children}
      </a>
    );
  }
}

export { Router, Route, Link };
