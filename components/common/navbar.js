"use strict";

var React = require ('react'),
    Router = require ('react-router'),
    $ = require('jquery'),
    Navigation = Router.Navigation,
    Link = Router.Link;

var ReactBootstrap = require('react-bootstrap'),
    //Navbar = ReactBootstrap.Navbar,
    //Nav = ReactBootstrap.Nav,
    //NavItem = ReactBootstrap.NavItem,
    //DropdownButton = ReactBootstrap.DropdownButton,
    //MenuItem = ReactBootstrap.MenuItem,
    ModalTrigger = ReactBootstrap.ModalTrigger,
    Button = ReactBootstrap.Button;


// var ReactRouterBootstrap = require('react-router-bootstrap'),
//     NavItemLink = ReactRouterBootstrap.NavItemLink,
//     MenuItemLink = ReactRouterBootstrap.MenuItemLink;

var Global = require('../global').getInstance(); 

var SlideMenu = require('./slide-menu');
var ModalLogin = require('../user/login');       
var ModalRegister = require('../user/signup');

var MyMenu = React.createClass({
  mixins: [Navigation],

  getInitialState: function() {
    return {
      isLoggedIn: null,
      opened:     false
    };
  },

  componentDidMount : function() {
    this.setState({isLoggedIn: this.props.isLoggedIn});
  },

  _dropdownButtonOnSelect: function(event) { 
    //event.preventDefault();
    console.log('onselect')
  },

  _linkOnClick: function(link, event) {
    this.toggle();
    this.transitionTo(link);
  },

  _linkOnClickPopup: function(link, event) {

  },

  _loggedIn: function(event) {
    this.setState({isLoggedIn: true});
  },

  _logout: function(event) {
    var me = this;
    event.preventDefault();

    Global.logout(function(){
      me.setState({isLoggedIn: false});
    });
  },

  toggle: function() {
    this.refs.slideMenuLeft.toggle();
  },

  render: function() {
    console.log('render MyMenu');
    //var loginButton;
    var userId = Global.getUser()._id;
    var myShopLink; 
    var profileLink;
    var isLoggedIn;

    if (this.state.isLoggedIn === null)
      isLoggedIn = this.props.isLoggedIn
    else
      isLoggedIn = this.state.isLoggedIn

    var menuItemLogin = '';
    var menuItemSignUp = '';

    var menuItemMyShop = '';
    var menuItemProfile = '';
    var menuItemNewShop = '';
    var menuItemNewBook = '';
    var menuItemLovedShop = '';
    var menuItemFriend = '';
    var menuItemLogout = '';
    var menuLeft = '';

    if (isLoggedIn) { 
      profileLink = "/users/" + userId;
      myShopLink = profileLink + '/shops';

      menuItemProfile = <a href="#" onClick={this._linkOnClick.bind(this, profileLink)}>{Global.getUser().username}</a>
      menuItemMyShop = <a href="#" className="list-group-item" onClick={this._linkOnClick.bind(this, myShopLink)}>My Shop</a>
      menuItemNewShop = <a href="#" className="list-group-item" onClick={this._linkOnClick.bind(this, '/shops/new')}>New Shop</a>
      menuItemNewBook = <a href="#" className="list-group-item" onClick={this._linkOnClick.bind(this, '/books/new')}>New Book</a>
      menuItemLovedShop = <a href="#" className="list-group-item">Loved Shop</a>
      menuItemFriend = <a href="#" className="list-group-item">Friends</a>
      menuItemLogout = <a href="#" className="list-group-item" onClick={this._logout}>Logout</a>
    }
    else {
      menuItemLogin = <ModalTrigger modal={<ModalLogin loggedIn={this._loggedIn}/>}>
                        <a href="#" className="list-group-item">Login</a>
                      </ModalTrigger>

      menuItemSignUp =  <ModalTrigger modal={<ModalRegister />}>
                          <a href="#" className="list-group-item">Sign-up</a>
                        </ModalTrigger>      
    }

    menuLeft =       
          <div className="list-group"> 
              <li className="list-group-item menu-item-header">
                {menuItemProfile}
              </li>              
              <a href="#" className="list-group-item" onClick={this._linkOnClick.bind(this, '/main')}>Main</a>
              <a href="#" className="list-group-item" onClick={this._linkOnClick.bind(this, '/info')}>Info</a>
              <a href="#" className="list-group-item" onClick={this._linkOnClick.bind(this, '/item')}>Item</a>
              <a href="#" className="list-group-item" onClick={this._linkOnClick.bind(this, '/book-list')}>Book List</a>
              <a href="#" className="list-group-item" onClick={this._linkOnClick.bind(this, '/hello')}>Hello</a>                            
              {menuItemLogin}
              {menuItemSignUp}
              {menuItemMyShop} 
              {menuItemNewShop}
              {menuItemNewBook}
              {menuItemLovedShop}
              {menuItemFriend}
              {menuItemLogout}
          </div>

    return (
      <div>
        <nav className="navbar navbar-default navbar-fixed-top">

          <div className="container-fluid">
            <div className="navbar-header">
              <div className="navbar-left btn-open-menu" onClick={this.toggle}>
                <span className="glyphicon glyphicon-menu-hamburger"></span>
              </div>
              <a className="navbar-brand" href="#">Brand2</a>
            </div>

            <div className="collapse navbar-collapse">
              <ul className="nav navbar-nav navbar-nav">
                <li><a href="#">item 1</a></li>
              </ul>
            </div>
          </div>
        </nav>

        <SlideMenu  
          id='menu-left'
          side='left'
          item={menuLeft} 
          ref='slideMenuLeft' /> 
                                            
      </div>
    );
  }
});

module.exports = MyMenu;