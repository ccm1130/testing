"use strict";

var React = require('react'),    
    $ = require('jquery'),
    ReactBootstrap = require('react-bootstrap');

var Global = require('./global').getInstance();

module.exports = class extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      count: '0'
    };
  }

  componentDidMount() {
    this._getMsgCount();
  }

  _getMsgCount() {
    var data = {
      type:     this.props.type,
      objid:    this.props.objid
    }

    $.ajax({
      url: '/api/messages/count',
      data: data,
      dataType: 'json',
      success: function(data) {        
        console.log(data);
        this.setState({
          count: data.count
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('#GET Error', status, err.toString());
      }.bind(this)
    });        
  }

  _goToMessage(e) {
    e.preventDefault();    
  }

  render() {
    return (
      <a href='#'>        
        <span className="badge">
          {this.state.count}&nbsp;
          <span className="glyphicon glyphicon-comment message-icon"></span>
        </span>        
      </a>
    );
  }
};

module.exports.propTypes = {    
  type:         React.PropTypes.string.isRequired,
  objid:        React.PropTypes.string.isRequired
};