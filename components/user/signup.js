"use strict";

var React = require ('react'),
	Router = require ('react-router'),
	ReactDOM = require('react-dom'),
	Navigation = Router.Navigation,
	//TransitionHook = Router.TransitionHook,
	$ = require('jquery');

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

	_register: function(event) {        
    var me = this;
    var username = ReactDOM.findDOMNode(this.refs.username).value;
   	var email = ReactDOM.findDOMNode(this.refs.email).value;
   	var pwd = ReactDOM.findDOMNode(this.refs.pwd).value;

    $.ajax({
      url: '/api/users',
      type: 'post',
      data: {
        username:  		username,
        password:  		Encrypt.hashPassword(pwd),
        email: 				email,
        createdt: 		Date() 
      },          
      dataType: 'json',
      success: function (res, status, xhr) {
      	var data = {
      		username: 	res.username,
      		password: 	res.password 
      	};

      	var _id = res._id;

				Global.login(data, function (res, status, xhr) {
					me.setState({msg: res.msg});

					if (res.msg === 'success') {
						me.props.onRequestHide();
						me.transitionTo('/users/' + _id);
					}
		    });								
      },
      error: function(xhr, status, err) {
        console.error('#GET Error', status, err.toString());
      }       
    });   	  	
  },

  render: function() {
  	console.log('render register');
    return (      
    	<Modal {...this.props} title='Sign Up' animation={true}>
	    	<div className='modal-body'>
					<div className="form-group">			  	
				    <label>User Name</label>
				    <input 	type="text" 
				    				className="form-control" 
				    				placeholder="User Name"
				    				ref="username" />
				  </div>    		 
				  <div className="form-group">
				    <label>Password</label>
				    <input 	type="password" 
				    				className="form-control"  
				    				placeholder="Password" 
				    				ref="pwd" />
				  </div>
				  <div className="form-group">
				    <label>Confirm Password</label>
				    <input 	type="password" 
				    				className="form-control"  
				    				placeholder="Confirm Password" 
				    				ref="cpwd" />
				  </div>
				  <div className="form-group">			  	
				    <label>Email address</label>
				    <input 	type="email" 
				    				className="form-control" 
				    				placeholder="Email"
				    				ref="email" />
				  </div>
				  <p>{this.state.msg}</p>
				  <div className="btn-group" role="group">
				  	<button type="submit" className="btn btn-default" onClick={this._register}>Register</button>		
				  	<button type="button" className="btn btn-default" onClick={this.props.onRequestHide}>Cancel</button>	  	
				  </div>
				</div>
			</Modal>
    );
  }

});


module.exports = Login;
