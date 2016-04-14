"use strict";

var React = require ('react'),
		Router = require ('react-router'),
		Navigation = Router.Navigation,
		//TransitionHook = Router.TransitionHook,
		$ = require('jquery');

var ReactBootstrap = require('react-bootstrap'),
    Button = ReactBootstrap.Button,
    TabbedArea = ReactBootstrap.TabbedArea,
    TabPane = ReactBootstrap.TabPane,
    ListGroup = ReactBootstrap.ListGroup,
    ListGroupItem = ReactBootstrap.ListGroupItem,
    Input = ReactBootstrap.Input,
    Panel = ReactBootstrap.Panel;	

var Global = require('../global').getInstance(),
    ShopActions = require('../../actions/ShopActions'),
    ShopStore = require('../../stores/ShopStore'),
    ShopLink = require('./shop-link'),
    UserLink = require('../user/user-link'),
    LikeIcon = require('../like-icon'),
    MessageIcon = require('../message-icon'),
    ProductListGroup = require('../product/product-listgroup');

module.exports = React.createClass({
	mixins: [Navigation],

  _setData: function(data) {
    this.data = data
  },

	getInitialState: function() {
    return {data:{}};
  },

  componentWillUnmount: function() {
    ShopStore.removeChangeListener(this._afterFetch);
  },  

	componentDidMount: function() {
    console.log('shop-info did mount');
		var id = this.props.params.id;

    ShopActions.fetchRecord(id, 'shops');

    ShopStore.addChangeListener(this._afterFetch);
	},

  _afterFetch: function() {
    //console.log('_afterFetch', ShopStore.getShopList());
    this.setState({data: ShopStore.getShopList()});
  },

  _changeValue: function(field, event) {
    var obj = this.state.data;
    obj[field] = event.target.value;
    
    this.setState({data:obj, modified:true});
  },  

  _handleUpdate: function(event) {
    event.preventDefault();

    if (!this.state.modified)
      return;

    var me = this;    

    var data = this.state.data;
    data['modifydt'] = Date();

    var shopId = this.props.params.id;
 
    ShopActions.update(data, shopId);
  },  

  render: function() {  
    //var userId = Global.getUser()._id;
    var userId = this.state.data.userid;
    var shopId = this.props.params.id;

    console.log('render shop info', this.state.data.userid);

    var header = 
      <div>
        <div className="thumbnail">                         
          <img src="/images/shop-banner.png" alt="..." />
        </div>  
        <h4>
          <ShopLink shopId={shopId} /> &nbsp;
          <UserLink userid={userId} /> &nbsp;
          <LikeIcon type='S' objid={shopId} /> &nbsp;
          <MessageIcon type='S' objid={shopId} />         
        </h4>
      </div>

    return (      
    	<div className="container-fluid" >         
        <form onSubmit={this._handleUpdate}>
          <Panel header={header}>
            <label>Address</label>
            <Input type="text"
                    placeholder="Address"
                    className="form-control" 
                    value={this.state.data.addrln1}
                    onChange={this._changeValue.bind(null, 'addrln1')} />
            <Input type="text"
                    className="form-control" 
                    value={this.state.data.addrln2}
                    onChange={this._changeValue.bind(null, 'addrln2')} />
            <Input type="text"
                    className="form-control" 
                    value={this.state.data.addrln3}
                    onChange={this._changeValue.bind(null, 'addrln3')} />
            <Input type="text"
                    className="form-control" 
                    value={this.state.data.addrln4}
                    onChange={this._changeValue.bind(null, 'addrln4')} />                                                                  
            <label>Phone</label>
            <Input type="text"
                    placeholder="Phone"
                    className="form-control" 
                    value={this.state.data.phone}
                    onChange={this._changeValue.bind(null, 'phone')} />
            <label>E-mail</label>
            <Input type="email"
                    placeholder="E-mail"
                    className="form-control" 
                    value={this.state.data.email}
                    onChange={this._changeValue.bind(null, 'email')} />                      
            <label>Website</label>
            <Input type="text"
                    placeholder="Website"
                    className="form-control" 
                    value={this.state.data.website}
                    onChange={this._changeValue.bind(null, 'website')} />                      
            <TabbedArea defaultActiveKey={1}>
              <TabPane eventKey={1} tab='Description'>
                <Input type='textarea' 
                       placeholder='Description' 
                       rows={10}
                       value={this.state.data.des}
                       onChange={this._changeValue.bind(null, 'des')} />
              </TabPane>
              <TabPane eventKey={2} tab='Shipment'>
                <Input type='textarea' 
                       placeholder='Shipment' 
                       rows={10}
                       value={this.state.data.shipment}
                        onChange={this._changeValue.bind(null, 'shipment')} />
              </TabPane>
            </TabbedArea>
            <Button type="submit" 
                    className="form-control" >
              Save
            </Button>
          </Panel>
        </form>

        <ProductListGroup shopId={this.props.params.id}/>
			</div>
    );
  }

});

