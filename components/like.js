"use strict";

var React = require('react'),    
    $ = require('jquery'),
    ReactBootstrap = require('react-bootstrap');

var Global = require('./global').getInstance();

module.exports = class extends React.Component {
  constructor(props, context) {
    super(props, context);
    this._like = this._like.bind(this);

    this.state = {
      count: '0',
      isLiked: false,
      likeId: 0
    };
  }

  componentDidMount() {
    this._isLiked();
  }

  _isLiked() {
    var data = {
      type:     this.props.type,
      objid:    this.props.objid,
      userid:   Global.isLoggedIn() ? Global.getUser()._id : 0
    }

    $.ajax({
      url: '/api/like/count',
      data: data,
      dataType: 'json',
      success: function(data) {        
        console.log(data);
        this.setState({
          count: data.count,
          isLiked: data.isLiked,
          likeId: data.likeId
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('#GET Error', status, err.toString());
      }.bind(this)
    });        
  }

  _like(e) {
    e.preventDefault();
    
    var num = this.state.isLiked ? -1 : 1;
    var status = this.state.isLiked ? 'D': 'A';
    var type;
    var urlId = '';
    var count = parseInt(this.state.count) + num;

    if (this.state.likeId !== 0) {
      urlId = '/' + this.state.likeId;
      type = 'PUT';
    } else {
      status = 'A';
      type = 'POST';
    }

    var data = {  
      type:     this.props.type,
      objid:    this.props.objid,
      userid:   Global.getUser()._id,
      status:   status      
    };

    this.setState({
      count:count, 
      isLiked: !this.state.isLiked
    });

    $.ajax({
      url: '/api/like' + urlId,
      type: type,
      data: data,
      dataType: 'json',
      success: function(data) {

      }.bind(this),
      error: function(xhr, status, err) {
        console.error('#GET Error', status, err.toString());
      }.bind(this)
    });
  }

  render() {
    var likeLink;

    if (!Global.isLoggedIn()) 
      likeLink = ''
    else if (this.state.isLiked)
      likeLink = <a href='#' onClick={this._like} className="like-text">Liked</a>
    else
      likeLink = <a href='#' onClick={this._like} className="like-text">Like</a>

    return (
      <span>        
        {likeLink}
        &nbsp;
        <span className="badge">
          {this.state.count}&nbsp;
          <span className="glyphicon glyphicon-heart like-icon"></span>
        </span>        
      </span>
    );
  }
};

module.exports.propTypes = {    
  type:         React.PropTypes.string.isRequired,
  objid:        React.PropTypes.string.isRequired
};