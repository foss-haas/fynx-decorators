'use strict';
var React = require('react');
module.exports = function connect(store, name) {
  return function (DecoratedComponent) {
    function update(value) {
      this.setState({[name]: value});
    }
    const displayName = DecoratedComponent.displayName || DecoratedComponent.name || 'Component';
    return class Component extends React.Component {
      static DecoratedComponent = DecoratedComponent;
      static displayName = `Connected(${displayName})`;
      state = {[name]: store()};
      componentDidMount() {
        store.listen(update, this);
      }
      componentWillUnmount() {
        store.unlisten(update, this);
      }
      render() {
        return <DecoratedComponent {...this.props} {...this.state}/>;
      }
    };
  };
};
