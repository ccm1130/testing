"use strict";

var React = require ('react'),
    Router = require ('react-router'),
    $ = require('jquery'),
    Navigation = Router.Navigation,
    Link = Router.Link;

var ReactBootstrap = require('react-bootstrap'),
    Navbar = ReactBootstrap.Navbar,
    Nav = ReactBootstrap.Nav,
    NavItem = ReactBootstrap.NavItem,
    DropdownButton = ReactBootstrap.DropdownButton,
    MenuItem = ReactBootstrap.MenuItem,
    ModalTrigger = ReactBootstrap.ModalTrigger,
    Button = ReactBootstrap.Button; ;


// var ReactRouterBootstrap = require('react-router-bootstrap'),
//     NavItemLink = ReactRouterBootstrap.NavItemLink,
//     MenuItemLink = ReactRouterBootstrap.MenuItemLink;

var Global = require('./global').getInstance(); 

var ModalLogin = require('./user/login');       
var ModalRegister = require('./user/signup');
var ShopList = require('./book-list');

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

    //var BigSlide = require('../libs/bigSlide.min');

    //$('.menu-link').bigSlide(); 
  },

  _dropdownButtonOnSelect: function(event) { 
    //event.preventDefault();
    console.log('onselect')
  },

  _linkOnClick: function(link, event) {
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

  menuToggle: function() {
    var menu = $('.push');
    var push = $('.push');
    //var value = side === 'left' ? 300, -300;

    if (menu) {
      if (this.state.opened) {        
        menu.css("transition-duration", ".6s");                  
        menu.css("transform", "translate(0px,0)");

        setTimeout(function() {
          push.removeAttr("style");
        }, 600);

        //better remove attribute after the transform is done.
        //push.removeAttr("style");
      } else {
        menu.css("transition-duration", ".6s");                  
        menu.css("transform", "translate(300px,0)");              
      }

      this.setState({opened:!this.state.opened});
    }     
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

    //else 
      //loginButton = <NavItemLink eventKey={60} to='login'>Login</NavItemLink>

/*
        <Navbar brand='Test' toggleNavKey={0} fluid>
          <Nav right eventKey={0}> 
            <NavItem eventKey={5} onClick={this._linkOnClick.bind(this, '/main')}>Main</NavItem>
            <NavItem eventKey={10} onClick={this._linkOnClick.bind(this, '/info')}>Info</NavItem>
            <NavItem eventKey={20} onClick={this._linkOnClick.bind(this, '/item')}>Item</NavItem>
            <NavItem eventKey={30} onClick={this._linkOnClick.bind(this, '/book-list')}>Book List</NavItem>          
            <NavItem eventKey={50} onClick={this._linkOnClick.bind(this, '/hello')}to='hello'>Hello</NavItem>                    
            { !(isLoggedIn) && 
              <ModalTrigger modal={<ModalLogin loggedIn={this._loggedIn}/>}>
                <NavItem eventKey={60}>Login</NavItem>
              </ModalTrigger>
            }
            { !(isLoggedIn) && 
              <ModalTrigger modal={<ModalRegister />}>
                <NavItem eventKey={60}>Sign Up</NavItem>
              </ModalTrigger>
            }          
            {
              (isLoggedIn) &&
              <DropdownButton eventKey={70} title={Global.getUser().username} onSelect={this._dropdownButtonOnSelect}>
                <MenuItem eventKey={1} onClick={this._linkOnClick.bind(this, profileLink)} >Profile</MenuItem>
                <MenuItem eventKey={2} onClick={this._linkOnClick.bind(this, '/shops/new')}>New Shop</MenuItem>
                <MenuItem eventKey={2} onClick={this._linkOnClick.bind(this, '/books/new')}>New Book</MenuItem>
                <MenuItem eventKey={3} onClick={this._linkOnClick.bind(this, myShopLink)}>My Shop</MenuItem>
                <MenuItem eventKey={4} >Loved Shop</MenuItem>             
                <MenuItem eventKey={5} >Friends</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey='6' onClick={this._logout}>Logout</MenuItem>
              </DropdownButton>
            }
          </Nav>
        </Navbar>
*/  
    var menuItemLogin = '';
    var menuItemSignUp = '';

    var menuItemMyShop = '';
    var menuItemProfile = '';
    var menuItemNewShop = '';
    var menuItemNewBook = '';
    var menuItemLovedShop = '';
    var menuItemFriend = '';
    var menuItemLogout = '';

    if (isLoggedIn) { 
      profileLink = "/users/" + userId;
      myShopLink = profileLink + '/shops';

      menuItemProfile = <li><a href="#" className="menu-link" onClick={this._linkOnClick.bind(this, profileLink)}>Profile</a></li>
      menuItemMyShop = <li><a href="#" className="menu-link" onClick={this._linkOnClick.bind(this, myShopLink)}>My Shop</a></li>
      menuItemNewShop = <li><a href="#" className="menu-link" onClick={this._linkOnClick.bind(this, '/shops/new')}>New Shop</a></li>
      menuItemNewBook = <li><a href="#" className="menu-link" onClick={this._linkOnClick.bind(this, '/books/new')}>New Book</a></li>
      menuItemLovedShop = <li><a href="#">Loved Shop</a></li>
      menuItemFriend = <li><a href="#">Friends</a></li>
      menuItemLogout = <li><a href="#" className="menu-link" onClick={this._logout}>Logout</a></li>
    }
    else {
      menuItemLogin = <ModalTrigger modal={<ModalLogin loggedIn={this._loggedIn}/>}>
                        <li><a href="#">Login</a></li>
                      </ModalTrigger>

      menuItemSignUp =  <ModalTrigger modal={<ModalRegister />}>
                          <li><a href="#">Sign-up</a></li>
                        </ModalTrigger>      
    }

    return (
      <div>
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <a href="#" onClick={this.menuToggle}>
                <div className="glyphicon glyphicon-align-justify"></div>
              </a>
              <a className="navbar-brand" href="#">Brand2</a>
            </div>
          </div>
        </nav>

        <nav id="menu" className="slide-menu-left" role="navigation">
            <ul className="nav nav-pills nav-stacked">
                { (isLoggedIn) && <li><a>{Global.getUser().username}</a></li> }
                <li><a href="#" className="menu-link" onClick={this._linkOnClick.bind(this, '/main')}>Main</a></li>
                <li><a href="#" className="menu-link" onClick={this._linkOnClick.bind(this, '/info')}>Info</a></li>
                <li><a href="#" className="menu-link" onClick={this._linkOnClick.bind(this, '/item')}>Item</a></li>
                <li><a href="#" className="menu-link" onClick={this._linkOnClick.bind(this, '/book-list')}>Book List</a></li>
                <li><a href="#" className="menu-link" onClick={this._linkOnClick.bind(this, '/hello')}>Hello</a></li>              
                {menuItemLogin}
                {menuItemSignUp}
                {menuItemProfile}
                {menuItemMyShop} 
                {menuItemNewShop}
                {menuItemNewBook}
                {menuItemLovedShop}
                {menuItemFriend}
                {menuItemLogout}                
                  
            </ul>
        </nav>      
      </div>
    );
  }
});

module.exports = MyMenu;