"use strict";

var React = require('react'),
    TodoActions = require('../actions/TodoActions'),
    TodoStore = require('../stores/TodoStore'),
    DOM = React.DOM, div = DOM.div, button = DOM.button, ul = DOM.ul, li = DOM.li;

//var Menu = require('react-burger-menu').bubble;    


function getState() {
  return {
    count: TodoStore.getCount()    
  };
}

// This is just a simple example of a component that can be rendered on both
// the server and browser

module.exports = class extends React.Component {
  constructor(props, context) {
    super(props, context);
    this._increment = this._increment.bind(this);
    this._onChange = this._onChange.bind(this);
    console.log('getInitialState');
    this.state = getState();
  }

  componentDidMount() {
    TodoStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    TodoStore.removeChangeListener(this._onChange);
  }

  _increment() {
    console.log('_increment');
    //var count = this.state.count + 1;

    TodoActions.addCount();
    //this.setState({ count: count});
  }

  _onChange() {
    console.log('_onChange:setState');
    this.setState(getState());
  }

  render() {
      console.log('render');
      return (
          <div className="container" onClick={this._increment}> 
            {this.state.count}     
          </div>
        )            
  }
};
