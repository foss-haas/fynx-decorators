'use strict';
module.exports = connect;

function connect(store, name) {
  function update(value) {
    var state = {};
    state[name] = value;
    this.setState(state);
  }
  return {
    getInitialState: function getInitialState() {
      var state = {};
      state[name] = store();
      return state;
    },
    componentDidMount: function componentDidMount() {
      store.listen(update, this);
    },
    componentWillUnmount: function componentWillUnmount() {
      store.unlisten(update, this);
    }
  };
}