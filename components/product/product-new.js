"use strict";

var React = require('react'),    
    Router = require ('react-router'),    
    Navigation = Router.Navigation,
    $ = require('jquery');

var ReactDOM = require('react-dom');

var ReactBT = require ('react-bootstrap'),
    Input = ReactBT.Input;

var Global = require('../global').getInstance();

module.exports = React.createClass({
  mixins: [Navigation],

  _handleSubmit: function(event) {
    event.preventDefault();

    var me = this;

    var code = ReactDOM.findDOMNode(this.refs.code).value;
    var name = ReactDOM.findDOMNode(this.refs.name).value;
    var price = ReactDOM.findDOMNode(this.refs.price).value;      
    var cat = ReactDOM.findDOMNode(this.refs.cat).value;
    var kind = ReactDOM.findDOMNode(this.refs.kind).value;
    var shopId = this.props.params.shopid;

    var data = {
      code:       code,
      name:       name,
      price:      price,
      cat:        cat,
      kind:       kind,
      shopid:     shopId
    }

    $.ajax({
        url: '/api/products',
        type: 'post',
        data: data,
        headers: {
            'Authorization': 'token-123'
        },
        dataType: 'json',
        success: function (data) {
            console.log(data);
            me.transitionTo('/book-list');
        }
    });        

  },

  render: function() {
      //console.log('render new book' + Global.getToken());        
      return (
        <div className="container">
          <form onSubmit={this._handleSubmit}>
            <div className="form-group">          
              <label>Code</label>
              <input  type="text" 
                      className="form-control" 
                      id="name" 
                      placeholder="Code" 
                      ref="code" />
            </div>            
            <div className="form-group">          
              <label>Name</label>
              <input  type="text" 
                      className="form-control" 
                      id="name" 
                      placeholder="Name" 
                      ref="name" />
            </div>
            <div className="form-group">          
              <label>Price $</label>
              <input  type="text" 
                      className="form-control" 
                      id="price" 
                      placeholder="Price" 
                      ref="price" />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select className="form-control" ref="cat">
                <option value=''>---Choose---</option>
                <option value='a'>Cat 1</option>
                <option value='b'>Cat 2</option>
                <option value='o'>Others</option>                  
              </select>
            </div>              
            <div className="form-group">
              <label>Kind</label>
              <select className="form-control" ref="kind">
                <option value=''>---Choose---</option>
                <option value='a'>Kind 1</option>
                <option value='b'>Kind 2</option>
                <option value='o'>Others</option>                  
              </select>
            </div>
            <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>
      );
  }
});
