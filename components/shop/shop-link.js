"use strict";

var React = require('react'), 
    Router = require ('react-router'),
    Navigation = Router.Navigation,
    $ = require('jquery'),
    ReactBootstrap = require('react-bootstrap');

module.exports = React.createClass({

  mixins: [Navigation],

  propTypes: {      
    shopId: React.PropTypes.string.isRequired,
    shopName: React.PropTypes.string
  },

  getInitialState: function() {
    return {
      shopName: '-',
      notFound: true
    };
  },

  _linkOnClick: function(e) {
    e.preventDefault();

    var link = '/shops/' + this.props.shopId;

    if (this.state.notFound === false)
      this.transitionTo(link);  
  },

  componentDidMount: function() {
    console.log('shop link did mount');

    if (typeof this.props.shopName !== 'undefined')      
      this.setState({shopName:this.props.shopName, notFound: false});          
    else {
      $.ajax({
        url: '/api/shops/' + this.props.shopId,
        dataType: 'json',
        success: function(data) {
          this.setState({shopName:data.name, notFound: false});
        }.bind(this),
        error: function(xhr, status, err) {          
          console.error('#GET Error', status, err.toString());
        }.bind(this)
      });      
    }
  },

  render: function() {
    return (
      <a href='#' onClick={this._linkOnClick} className="shop-link">
        {this.state.shopName}
      </a>
    );
  }
});