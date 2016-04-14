"use strict";

var $ = require('jquery');


var SingletonClass = (function(){
  function SingletonClass() {
    return {     
      handleListFetch: function(url, filter, callback) {

        console.log('handleListFetch', url + filter);

        $.ajax({
          url: '/api/' + url + filter,
          dataType: 'json',
          success: function(data) {
            callback(data);
          }.bind(this),
          error: function(xhr, status, err) {
            console.error('#GET Error', status, err.toString());
          }.bind(this)
        });
      },

      handleFetch: function(id, url, callback) {
        $.ajax({
          url: '/api/' + url + '/' + id,
          dataType: 'json',
          success: function(data) {
            callback(data);
          }.bind(this),
          error: function(xhr, status, err) {
            console.error('#GET Error', status, err.toString());
          }.bind(this)
        });
      },

      handleCreate: function(data, url, callback) {
        console.log('Create Shop', data);

        $.ajax({
            url: '/api/' + url,
            type: 'post',
            data: data,
            //headers: {
            //    'Authorization': 'token-123'
            //},
            dataType: 'json',
            success: function (data) {
              console.log('Created');
              callback(data);
            }
        });
      },

      handleUpdate: function(data, id, url, callback) {
        console.log('Update Shop', data, id);

        $.ajax({
          url: '/api/' + url + '/' + id,
          type: 'put',
          data: data,
          //headers: {
          //    'Authorization': 'token-123'
          //},
          dataType: 'json',
          success: function (data) {
            console.log('Saved');
            //console.log('data', data);
            callback();
          }
        });   
      },

      handleDelete: function(id, url, callback) {
        console.log('Delete Shop', id);
        $.ajax({
          url: '/api/' + url + '/' + id,
          type: 'DELETE',
          success: function(data) {
            console.log('Deleted');
            callback();
          }
        });
      }            
    }
  }
  var instance;
  return {
      getInstance: function(){
          if (instance == null) {
              instance = new SingletonClass();
              // Hide the constructor so the returned objected can't be new'd...
              instance.constructor = null;
          }
          return instance;
      }
 };
})();


module.exports = SingletonClass;
	