/*
Create a `withStorage` higher order component that manages saving and retrieving
the `sidebarIsOpen` state to local storage
*/

import "./index.css";
import React from "react";
import MenuIcon from "react-icons/lib/md/menu";
import { set, get, subscribe } from "./local-storage";

const withStorage = (storageKey, defValue) => Component => {
  return class extends React.Component {
    static WrappedComponent = Component;

    state = {
      [storageKey]: get(storageKey, defValue)
    };

    componentDidMount() {
      this.unsubscribe = subscribe(() => {
        this.setState({
          [storageKey]: get(storageKey)
        });
      });
    }

    set = value => {
      set(storageKey, value);
    };

    setStorage = () => {};
    render() {
      return (
        <Component {...this.state} setStorage={this.set} {...this.props} />
      );
    }
  };
};

class App extends React.Component {
  render() {
    const { sidebarIsOpen, setStorage } = this.props;
    return (
      <div className="app">
        <header>
          <button
            className="sidebar-toggle"
            title="Toggle menu"
            onClick={() => {
              setStorage(!sidebarIsOpen);
            }}
          >
            <MenuIcon />
          </button>
        </header>

        <div className="container">
          <aside className={sidebarIsOpen ? "open" : "closed"} />
          <main />
        </div>
      </div>
    );
  }
}

export default withStorage("sidebarIsOpen", false)(App);
