"use strict";

var React = require ('react');
var Router = require ('react-router');
var RouteHandler = Router.RouteHandler;

var Global = require('./global').getInstance();
var Navbar = require('./common/navbar');

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.setLoggedIn = this.setLoggedIn.bind(this);
    console.log('app initial');

    this.state = {
      isLoggedIn: null
    };
  }

  componentWillMount() {
    console.log('app will mount');    
    Global.checkLoggedIn(this.setLoggedIn);
  }

  componentDidMount() {    

  }

  setLoggedIn(value) {
    console.log('app logged in ', value);
    this.setState({isLoggedIn: value});
  }

  render() {
    console.log('render app', this.state.isLoggedIn);

    var menu = "<div/>";

    if (this.state.isLoggedIn !== null)
      menu = <Navbar isLoggedIn={this.state.isLoggedIn}/>

    return (       
      <div id="app">
        {menu}
				<div className="content push">
        	<RouteHandler />
        </div>
      </div> 
    );
  }
}


module.exports = App;
	