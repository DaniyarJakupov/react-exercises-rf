import React from "react";
import PropTypes from "prop-types";

class Provider extends React.Component {
  /*============== Create context for redux store =============*/
  static childContextTypes = {
    store: PropTypes.object.isRequired
  };

  getChildContext() {
    return {
      store: this.props.store
    };
  }

  // Render children elements
  render() {
    return this.props.children;
  }
}

// HOC pattern
// connect(mapStateToProps, mapDispatchToProps)(Component)
const connect = (mapStateToProps, mapDispatchToProps) => Component => {
  // 2nd function takes Component as an arg and returns wrapped version of provided Component
  return class extends React.Component {
    // Get access to redux store through react context
    static contextTypes = {
      store: PropTypes.object.isRequired
    };

    // Subscribe to redux store
    componentDidMount() {
      this.unsubscribe = this.context.store.subscribe(() => {
        this.forceUpdate();
      });
    }

    componentWillUnmount() {
      this.unsubscribe();
    }

    render() {
      const { dispatch, getState } = this.context.store;
      const state = getState();

      return (
        <Component
          {...mapStateToProps(state)}
          {...mapDispatchToProps(dispatch)}
        />
      );
    }
  };
};

export { Provider, connect };
