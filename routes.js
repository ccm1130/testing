"use strict";

var React = require ('react'),
	Router = require ('react-router'),
	Route = Router.Route,
	DefaultRoute = Router.DefaultRoute,
	NotFoundRoute = Router.NotFoundRoute;

//var App = typeof window == 'undefined'? require ('./components/app_server') : require ('./components/app');
var App = require ('./components/app'),
	Main = require('./components/main'),
	Item = require('./components/item'),
	Info = require('./components/info'),
	BookList = require('./components/book-list'),
	BookNew = require('./components/book-new'),
	//Hello = require('./components/hello'),
	//Login = require('./components/login'),
	//SignUp = require('./components/signup'),
	UserInfo = require('./components/user/user-info'),
	ShopList = require('./components/shop/shop-list'),
	ShopInfo = require('./components/shop/shop-info'),
	ShopNew = require('./components/shop/shop-new'),
	ProductNew = require('./components/product/product-new');

//var props = {initialCount:10};

var routes = (
  <Route name="top" handler={App} path="/" >    
  	<Route name="main" handler={Main} />
    <Route name="item" handler={Item} />
    <Route name="info" handler={Info} />
    <Route name="book-list" handler={BookList} />
    <Route path="/books/new" handler={BookNew} />

    
    <Route name="/shops" handler={ShopList} />
		<Route path="/shops/new" handler={ShopNew} />
		<Route path="/shops/:id" handler={ShopInfo} />
		<Route name="/users/:id/shops" handler={ShopList} />

		{
			//<Route path="/login" handler={Login} />
			//<Route path="/signup" handler={SignUp} />
		}

    <Route path="/shops/:shopid/products/new" handler={ProductNew} />

    <Route path="/users/:id" handler={UserInfo} />
    <DefaultRoute handler={Main} />
  </Route>
);

module.exports = routes; 
