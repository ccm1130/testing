"use strict";

var React = require('react'),
    $ = require('jquery');

var ReactBootstrap = require('react-bootstrap'),
    Grid    = ReactBootstrap.Grid,
    Row     = ReactBootstrap.Row,
    Col     = ReactBootstrap.Col,
    Panel   = ReactBootstrap.Panel;

var DropDown = require('../dropdown');

var Global = require('../global').getInstance(),
    ShopActions = require('../../actions/ShopActions'),
    ShopStore = require('../../stores/ShopStore');

var UserLink = require('../user/user-link');
var LikeIcon = require('../like-icon');
var MessageIcon = require('../message-icon');

class ShopFilter extends React.Component {
  constructor(props, context) {
    super(props, context);
    this._handleFilter = this._handleFilter.bind(this);
  }

  _handleFilter(value) {    
    this.props._handleFilter(value);
  }

  render() {
    return (
        <div>
          <DropDown title='Category' 
                    caption='--- All ---'
                    type='SHOPCAT'
                    resUrl='categories' 
                    onChange={this._handleFilter} />
        </div>        
      );
  }
}

function ShopItem(props) {
  var shopLink = '/shops/' + props.shop._id;
  //var userLink = '/users/' + this.props.shop.username;

  return (            
    <Col xs={12} sm={6} md={4}>
      <div className="thumbnail">
        <span className="glyphicon glyphicon-remove-circle btn-delete"
          onClick={props.handleDelete}>
        </span>                
        <img src="/images/shop-banner.png" alt="..." />
        <Row>
          <Col xs={6}>
            <h4>
              <a href={shopLink}>
                {props.shop.name}
              </a>
              &nbsp;             
              <UserLink userid={props.shop.userid} />
            </h4>
          </Col>
          <Col xs={6}>
            <h4 className="center middle">
              <LikeIcon type='S' objid={props.shop._id} /> &nbsp;
              <MessageIcon type='S' objid={props.shop._id} />
            </h4>
          </Col>
        </Row>
      </div>                
    </Col>
  );
}

ShopItem.propTypes = {    
  handleDelete: React.PropTypes.func.isRequired,
  shop: React.PropTypes.object.isRequired
};

class ShopList extends React.Component {
  constructor(props, context) {
    super(props, context);
    this._afterFetch = this._afterFetch.bind(this);
    this._handleDelete = this._handleDelete.bind(this);
    this._handleFilter = this._handleFilter.bind(this);

    this.state = {
      data: {shops: []},
      filterCat: '',
      limit: 10, //desktop and mobile should load diff number of record
      loadCount: 0,
      lastFetchTime: null
    };
  }

  componentDidMount() {
    var me = this;
    var array = []; 

    ShopStore.addChangeListener(this._afterFetch);

    this._loadData();

    //$(document).bind('scroll', function() {
    //  console.log('scrolling');
    //  me._loadMore();        
    //});
  }

  componentWillUnmount() {
    //console.log('componentWillUnmount');
    //$(document).unbind('scroll');    

    ShopStore.removeChangeListener(this._afterFetch);
  }

  _afterFetch() {
    this.setState({data: {shops:ShopStore.getShopList()}});
  }

  _handleDelete(index, event) {
    console.log('delete shop');

    var me = this;
    var shops = this.state.data.shops;
    var shopId = shops[index]._id
    
    shops = shops.splice(index, 1);

    this.setState(shops);

    ShopActions.delete(shopId);
  }

  _handleFilter(filterCat) {
    console.log('handleFilter: ' + filterCat);
    this.setState({filterCat: filterCat});
  }

  /*_loadMore: function() {
    if (typeof $('.loading') !== 'undefined')
      if (this._isBottom($('.loading')))
        this._loadData();
  },*/

  _loadData() {
    var me = this; 
    var curDt = new Date();
    var timeDiff = (curDt - this.state.lastFetchTime) / 1000;

    var filter = ''
    
    if (typeof this.props.params.id !== 'undefined')
      filter = '?userid__equals=' + Global.getUser()._id;

    ShopActions.fetchList(filter);

    //console.log('Global.getUser()._id', Global.getUser()._id);

    /*if (this.state.lastFetchTime === null || timeDiff >= 30) {         

      $.ajax({
        url: '/api/shops?limit=' + me.state.limit 
                      + "&skip=" + me.state.loadCount * me.state.limit
                      + filter,
        dataType: 'json',
        success: function(data) {
          console.log('setState');
          array = $.merge(me.state.data.shops, data);                

          if (Object.keys(data).length === 0) {
            console.log('End of List');
            this.state.lastFetchTime = new Date(); 
          }
          else {
            this.setState({data: {shops: array} });
            me.state.loadCount++;
            me._loadMore();
          }
        }.bind(this),
        error: function(xhr, status, err) {
          console.error('#GET Error', status, err.toString());
        }.bind(this)
      });
    }*/ 
  }

  /*_isBottom: function(elem) {
    var $elem = $(elem);
    var $window = $(window);

    var docViewTop = $window.scrollTop();
    var docViewBottom = docViewTop + $window.height();

    var elemTop = $elem.offset().top;
    var elemBottom = elemTop + $elem.height();    

    return ((elemBottom <= docViewBottom-50) && (elemTop >= docViewTop));
  },*/

  render() {
    console.log('render shop-list');
    var me = this;

    return (
      <Grid className="" fluid>
        {/* Pass it to child */}
        {/* <ShopItem data={this.state.data}/>} */}  
        <Row>
          <Col sm={12}>
            <ShopFilter 
              filterCat={this.props.filterCat}
              _handleFilter={this._handleFilter} 
            />
          </Col>
        </Row>
        <br/>
        <a href="/shops/new">
          <span className="glyphicon glyphicon-plus-sign"></span>
        </a>
        <Row>
        {
          this.state.data.shops.map(function(shop, index) {
            if (shop.cat === '' 
              || shop.cat === me.state.filterCat 
              || me.state.filterCat === '')   {

              return <ShopItem 
                      handleDelete={me._handleDelete.bind(me, index)}
                      shop={shop} 
                      key={index} />
            }
          })
        }
        </Row>
        <div className="loading">Loading...</div>
        <div><br /><br /><br /></div>
      </Grid>
    );
  }
}

ShopList.propTypes = {    
  limit: React.PropTypes.number    
};

module.exports = ShopList;