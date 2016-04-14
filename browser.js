"use strict";

var React = require('react');
var ReactDom = require('react-dom');
var Router = require('react-router');
var routes = require('./routes');

//var Info = require ('./pages/info.jsx');


Router.run(routes, Router.HistoryLocation, function (Handler) {
  ReactDom.render(<Handler />, document.getElementById('main'));
});
