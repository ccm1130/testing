"use strict";

var React = require ('react'),
		Router = require ('react-router'),
		Navigation = Router.Navigation,
		//TransitionHook = Router.TransitionHook,
		$ = require('jquery');

var ReactDOM = require('react-dom');

var ReactBootstrap = require('react-bootstrap'),
		Modal = ReactBootstrap.Modal,
		Button = ReactBootstrap.Button;

var Global = require('../global').getInstance();
var Encrypt = require('../encrypt').getInstance();

var Login = React.createClass({
	mixins: [Navigation],

	getInitialState: function() {
    return {msg:''};
  },


  componentWillMount: function() {
  	console.log('componentWillMount');  	
  	//console.log(Global.isLoggedIn());	  	
  	//if (Global.isLoggedIn())		
  },

	_goToRegister: function(event) {
      this.transitionTo('/users/new');
    },

  _isAuth: function(event) {
  	var me = this;

    $.post( "/api/logged-in", {})
	  	.done(function(data) {	    	
	    	me.setState({msg: data.msg});
	  	});
  },

  _login: function(event) {        
  var me = this;
  var username = ReactDOM.findDOMNode(this.refs.username).value;
  var pwd = ReactDOM.findDOMNode(this.refs.pwd).value;
  var remember_me = ReactDOM.findDOMNode(this.refs.remember_me).checked;

  var data = {
      username: 			username, 
      password: 			pwd,
      //password: 			Encrypt.hashPassword(pwd)
      remember_me: 		remember_me
  };

  console.log('try login');

  Global.login(data, function (res, status, xhr) {
          console.log('res', res);
          me.setState({msg: res.msg});

          if (res.msg === 'success') {
              me.props.loggedIn();
              me.props.onRequestHide();
              //me.transitionTo('/book-list');
          }
  });   	  	
},

  _logout: function(event) {
  	var me = this;

    $.get( "/api/logout", {})
	  	.done(function(data) {	    	
	    	me.setState({msg: data.msg});
	    	Global.setToken(null);
	    	Global.setCookie(Global.TOKEN, null, -10);
	  	});
  },

  render: function() {
  	console.log('render Login');
    return (      
    	<Modal {...this.props} title='Login' animation={true}>
    		<div className='modal-body'>
				  <div className="form-group">			  	
				    <label>Username</label>
				    <input 	type="type" 
				    				className="form-control"  
				    				placeholder="Username"
				    				ref="username" />
				  </div>
				  <div className="form-group">
				    <label>Password</label>
				    <input 	type="password" 
				    				className="form-control" 
				    				placeholder="Password" 
				    				ref="pwd" />
				  </div>
				  <div className="bg-danger">{this.state.msg}</div>				  
				  <div className="checkbox">
				    <label>
				      <input type="checkbox" 
				      			ref="remember_me" /> remember me
				    </label>
				  </div>
				  <div className="btn-group" role="group">				  
				  	<button type="button" className="btn btn-default" onClick={this._login}>Login</button>				  	
				  	{
				  		/*
				  		<button type="button" className="btn btn-default" onClick={this._goToRegister}>Register</button>	
				  		<button type="button" className="btn btn-default" onClick={this._isAuth}>Auth</button>
				  		<button type="button" className="btn btn-default" onClick={this._logout}>Logout</button>
				  		*/
				  	}
				  	<button type="button" className="btn btn-default" onClick={this.props.onRequestHide}>Cancel</button>
				  </div>
			  </div>
			</Modal>
    );
  }

});


module.exports = Login;
