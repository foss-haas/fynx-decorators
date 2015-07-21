'use strict';
var React = require('react');
module.exports = function connectProp(prop, name) {
  return function (DecoratedComponent) {
    function update(value) {
      this.setState({[name]: value});
    }
    const displayName = DecoratedComponent.displayName || DecoratedComponent.name || 'Component';
    return class Component extends React.Component {
      static DecoratedComponent = DecoratedComponent;
      static displayName = `Connected(${displayName})`;
      state = this.props[prop] ? {[name]: this.props[prop]()} : {};
      componentWillReceiveProps(nextProps) {
        if (nextProps[prop]) {
          if (nextProps[prop] === this.props[prop]) return;
          nextProps[prop].listen(update, this);
          update.call(this, nextProps[prop]());
          if (this.props[prop]) {
            this.props[prop].unlisten(update, this);
          }
        } else {
          if (!this.props[prop]) return;
          update.call(this, undefined);
          this.props[prop].unlisten(update, this);
        }
      }
      componentDidMount() {
        if (!this.props[prop]) return;
        this.props[prop].listen(update, this);
      }
      componentWillUnmount() {
        if (!this.props[prop]) return;
        this.props[prop].unlisten(update, this);
      }
      render() {
        return <DecoratedComponent {...this.props} {...this.state}/>;
      }
    };
  };
};
