"use strict";

var React = require ('react'),
    Router = require ('react-router'),
    $ = require('jquery'),
    Navigation = Router.Navigation,
    Link = Router.Link;

var ReactBootstrap = require('react-bootstrap'),
    ModalTrigger = ReactBootstrap.ModalTrigger,
    Button = ReactBootstrap.Button;

module.exports = React.createClass({
  mixins: [Navigation],

  getInitialState: function() {
    return {
      opened:     false
    };
  },

  componentDidMount : function() {
    console.log(this.props.side);
    if(this.props.side === 'left') {
      $('#'+this.props.id).addClass('slide-menu-left');
    } else {
      $('#'+this.props.id).addClass('slide-menu-right');
    }
  },

  toggle: function() {
    var menu = $('.slide-menu, .push, .navbar-fixed-top');
    var push = $('.push');
    
    var value = this.props.side === 'left' ? 300 : -300;

    if (push) {
      if (this.state.opened) {                
        $("body").css("overflow","auto");
        menu.css("transition-duration", ".6s");                  
        menu.css("transform", "translate(0px,0)");
        
        /*setTimeout(function() {
          push.removeAttr("style");
        }, 600);*/
        
      } else {        
        $("body").css("overflow","hidden");
        menu.css("transition-duration", ".6s");                  
        menu.css("transform", "translate("+value+"px,0)");                      
      }

      this.setState({opened:!this.state.opened});
    }     
  },

  render: function() {
    return (
      <nav id={this.props.id} className="slide-menu" role="navigation">
        {this.props.item}
      </nav>
    );    
  }
});