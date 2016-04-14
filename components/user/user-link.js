"use strict";

var React = require('react'), 
    Router = require ('react-router'),
    Navigation = Router.Navigation,
    $ = require('jquery'),
    ReactBootstrap = require('react-bootstrap');

module.exports = React.createClass({

  mixins: [Navigation],

  propTypes: {      
    userid: React.PropTypes.string.isRequired,
    username: React.PropTypes.string
  },

  getInitialState: function() {
    return {
      username: 'NO-USER',
      notFound: true
    };
  },

  _linkOnClick: function(e) {
    e.preventDefault();

    var link = '/users/' + this.props.userid;

    if (this.state.notFound === false)
      this.transitionTo(link);  
  },

  componentDidMount: function() {
    this.fetchUserName(this.props.userid);
  },

  componentWillReceiveProps: function(nextProps) {
    console.log('user link rec props', nextProps.userid);
    this.fetchUserName(nextProps.userid);
  },  

  fetchUserName: function(userid) {
    if (typeof this.props.username !== 'undefined')      
      this.setState({username:this.props.username, notFound: false});          
    else {
      $.ajax({
        url: '/api/users/' + userid,
        dataType: 'json',
        success: function(data) {
          console.log('users', data);
          this.setState({username:data.username, notFound: false});
        }.bind(this),
        error: function(xhr, status, err) {          
          console.log('#GET Error', status, err.toString());
        }.bind(this)
      });      
    }
  },

  render: function() {
    return (
      <a href='#' onClick={this._linkOnClick} className="user-link">
        {this.state.username}
      </a>
    );
  }
});