"use strict";

var React = require('react'),    
    Router = require ('react-router'),    
    Navigation = Router.Navigation,
    $ = require('jquery'),

    ReactBT = require ('react-bootstrap'),
    Input = ReactBT.Input,

    //Joi = require('joi'),

    //DemoInput = require('./demo'),

    Global = require('../global').getInstance(),
    ShopActions = require('../../actions/ShopActions'),
    ShopStore = require('../../stores/ShopStore'),
    DropDown = require('../dropdown');

module.exports = React.createClass({
  mixins: [Navigation],

  getInitialState: function() {
    return {  
      cat:''
    };
  },  

  componentDidMount: function() {
    ShopStore.addChangeListener(this._afterCreated);
  },

  componentWillUnmount: function() {
    //alert('shop-new-unmount');
    ShopStore.removeChangeListener(this._afterCreated);
  },

  _afterCreated: function() {
    this.transitionTo('/shops/' + ShopStore.getShopList()._id);
  },

  _onChange: function(field, value) {
    var obj = this.state;
    obj[field] = value;
    
    this.setState(obj);    
  },

  _handleSubmit: function(event) {
    event.preventDefault();

    //var me = this;
    //var name = this.state.name;
    //var cat = this.state.cat;      
    //var userid = Global.getUser()._id;

    var data = this.state;

    data['userid'] = Global.getUser()._id;

    /*var data = {
      name:       name,
      cat:        cat,
      userid:     userid
    };*/

    //console.log(data);
    ShopActions.create(data);
  },

  _selectCat: function(value) {
    this.setState({cat: value});
  },

  render: function() {

    //var validation = Joi.string().required().label('Name');

    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            New Shops
          </div>
          <div className="panel-body">      
            <form onSubmit={this._handleSubmit}>
              <input  
                className='form-control'
                type='text'
                ref='name'
                placeholder="Shop's Name"
                onChange={this._onChange}
              />
              <div className="form-group">
                <DropDown title='Category' 
                  caption='--- All ---'
                  type='SHOPCAT'
                  resUrl='categories' 
                  onChange={this._selectCat} />
              </div>
              <button type="submit" className="btn btn-default form-control">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
});
