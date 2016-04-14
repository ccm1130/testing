"use strict";

var React = require('react'),    
    Router = require ('react-router'),    
    Navigation = Router.Navigation,
    $ = require('jquery');

var ReactDOM = require('react-dom');

var ReactBT = require ('react-bootstrap'),
    Input = ReactBT.Input;

var Global = require('./global').getInstance();

module.exports = React.createClass({
  mixins: [Navigation],

    _handleSubmit: function(event) {
      event.preventDefault();

      var me = this;

      var name = ReactDOM.findDOMNode(this.refs.name).value;
      var price = ReactDOM.findDOMNode(this.refs.price).value;      
      var kind = ReactDOM.findDOMNode(this.refs.kind).value;

      console.log(name + ' / ' + price + ' / ' + kind);

      $.ajax({
          url: '/api/books',
          type: 'post',
          data: {
            name:   name,
            price:  price,
            kind: kind
          },
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
        console.log('render new book' + Global.getToken());        
        return (
          <div className="container">
            <form onSubmit={this._handleSubmit}>
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
                <label>Kind</label>
                <select className="form-control" ref="kind">
                  <option value=''>---Choose---</option>
                  <option value='c'>Comic</option>
                  <option value='b'>Baby</option>
                  <option value='o'>Others</option>                  
                </select>
              </div>
              <button type="submit" className="btn btn-default">Submit</button>
            </form>
          </div>
        );
    }
});
