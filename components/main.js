"use strict";

var React = require('react');
var ReactBootstrap = require('react-bootstrap');

//var ShopList = require('./generic-list');
//var ShopItem = require('./test-item');
var Lang = require('../json/lang');

var Encrypt = require('./encrypt').getInstance(); 

var UserLink = require('./user/user-link');
var LikeIcon = require('./like-icon');
var MessageIcon = require('./message-icon');

var ToggoleOpt = require('./toggle-options');

//var FileUpload = require('./fileupload');

var $ = require('jquery');

module.exports = class extends React.Component {
  constructor(props, context) {
    super(props, context);
    this._handleToggle = this._handleToggle.bind(this);

    this.state = {
      value: 0
    };
  }

  _handleToggle(value) {
    console.log(value);
  }

  componentDidMount() {
    var link = "http://192.168.0.101:3100/item";
    console.log('try call web outside origin');

    $.ajax({
      url: link,
      type: 'GET',
      success: function( data ) {
        
      }
    });
  }

  render() {

    var hashPwd = Encrypt.hashPassword('password');
    var token = Encrypt.hashPassword('token');
    var user = Encrypt.hashPassword('kate');

    // var formLang = $.grep( Lang, function( n, i ) {
    //   return n.lang==='ENG' && n.form==='FORM1';
    // });        
    // console.log('Form Lang', formLang);

    // var field = $.grep(formLang, function( n, i ) {
    //   return n.field==='FIELD1';
    // });    
    // console.log('Field', field);

    return (
      <div className="container">
        This is main page <br />

        {hashPwd}<br />
        {token}<br />
        {user}<br />

        <div onclick={this._handleToggle}>Click Me</div>

        <UserLink userid='55b5b552b2131110192c8ed5' />
        <LikeIcon type='S' objid='55b87fd8a50b0c9c1cafd612' /> &nbsp;
        <MessageIcon type='S' objid='55b87fd8a50b0c9c1cafd612' />

        <br />
        <div>
        <ToggoleOpt id='toggle1'
                    option1='Yes' 
                    option2='No' 
                    defaultOption='1' 
                    handleToggle={this._handleToggle} /> 
        </div><br/><br/>
        <div>
        <ToggoleOpt id='toggle2'
                    option1='Active' 
                    option2='Inactive' 
                    value1='Y'
                    value2='N'
                    defaultOption='Y' 
                    handleToggle={this._handleToggle} /> 
        </div><br/><br/>
        <div>
        <ToggoleOpt id='toggle3'
                    option1='Completed' 
                    option2='Incomplete' 
                    value1='C'
                    value2='I'
                    defaultOption='I' 
                    handleToggle={this._handleToggle} /> 
        </div><br/><br/>
      </div>
    );
  }
};

//module.exports = Info;