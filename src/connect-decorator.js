'use strict';
module.exports = connect;

function connect(store, name) {
  function update(value) {
    var state = {};
    state[name] = value;
    this.setState(state);
  }
  return {
    getInitialState() {
      var state = {};
      state[name] = store();
      return state;
    },
    componentDidMount() {
      store.listen(update, this);
    },
    componentWillUnmount() {
      store.unlisten(update, this);
    }
  };
}
