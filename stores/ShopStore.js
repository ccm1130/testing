"use strict";

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/Constants');
var assign = require('object-assign'); 
var $ = require('jquery');

var Crud = require('../common/crud').getInstance();

var result = '';
var url = 'shops';

var _shops = {};

function afterChange(data) {
  _shops = data;
  ShopStore.emitChange('change');
}

function afterUpdate() {
  ShopStore.emitChange('change'); 
}

function afterDelete() {
  ShopStore.emitChange('change'); 
}

var ShopStore = assign({}, EventEmitter.prototype, { 

  emitChange: function(event) {
    this.emit(event);
  },

  getShopList: function(){
    return _shops;
  },
 
  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  switch(action.actionType) {
    case Constants.SHOP_LIST_FETCH:
      Crud.handleListFetch(url, action.filter, afterChange);
      break;
      
    case Constants.SHOP_FETCH:
      Crud.handleFetch(action.id, url, afterChange);
      break;

    case Constants.SHOP_CREATE:
      Crud.handleCreate(action.data, url, afterChange);
      break;

    case Constants.SHOP_UPDATE:
      Crud.handleUpdate(action.data, action.id, url, afterUpdate);
      break;

    case Constants.SHOP_DELETE:
      Crud.handleDelete(action.id, url, afterDelete);
      break;            

    default:
      // no op
  }
});

module.exports = ShopStore;
