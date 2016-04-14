"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Validate = require('../../common/validation').getInstance();

class TextBox extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.validate = this.validate.bind(this);

    this.state = {
    	err: ''
    };
  }

  componentDidMount() {
  	//$(function () {
  		//$('[data-toggle="tooltip"]').tooltip()
		//})	
  }

  validate(text) {
  	var text = ReactDOM.findDOMNode(this.refs.textBox).value;

  	if (Validate.isEmail(text))
  		this.setState({err:''});
  	else
  		this.setState({err:'Error'});
  }
  
  render() {
    return (
      <div className='form-group'>
       	<label >Caption</label>
       	<input 	type='text' 
       					ref='textBox'
       					className='form-control' 
       					onBlur={this.validate}
       					placeholder="type something here"

       	/>
       	<span className='label label-danger' ref='textBoxErr'>{this.state.err}</span>
      </div>
    );
  }
}

module.exports = TextBox;