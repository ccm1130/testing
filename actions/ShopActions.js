"use strict";

/*
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TodoActions
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');

var Actions = {

  fetchList: function(filter) {
    AppDispatcher.dispatch({
      actionType: Constants.SHOP_LIST_FETCH,
      filter: filter
    });
  },

  fetchRecord: function(id) {
    AppDispatcher.dispatch({
      actionType: Constants.SHOP_FETCH,
      id: id
    });
  },

  create: function(data) {
    AppDispatcher.dispatch({
      actionType: Constants.SHOP_CREATE,
      data: data
    });
  },

  update: function(data, id) {
    AppDispatcher.dispatch({
      actionType: Constants.SHOP_UPDATE,
      data: data,
      id: id
    });
  },

  delete: function(id) {
    AppDispatcher.dispatch({
      actionType: Constants.SHOP_DELETE,
      id: id
    })
  }

};  

module.exports = Actions;
